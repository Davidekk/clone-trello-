import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSaveAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validationData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationData = schema.safeParse(data);
    console.log(validationData);
    if (!validationData.success) {
      return {
        fieldErrors: validationData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return await handler(validationData.data);
  };
};
