import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  input: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseAction<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  option: UseAction<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setLoading(true);

      try {
        const result = await action(input);
        if (!result) return;

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          option.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          option.onSuccess?.(result.data);
        }
      } finally {
        setLoading(false);
        option.onCompleted?.();
      }
    },
    [action, option]
  );
  return {
    error,
    data,
    loading,
    fieldErrors,
    execute,
  };
};
