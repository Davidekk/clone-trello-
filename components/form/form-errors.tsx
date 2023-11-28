import { XCircle } from "lucide-react";

interface FormErrorsProps {
  errors?: Record<string, string[] | undefined>;
  id: string;
}

export const FormErrors = ({ errors, id }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-errors`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id]?.map((error, index) => (
        <div
          key={index}
          className="flex items-center rounded-sm border-rose-500 bg-rose-500/10 font-medium"
        >
          <XCircle className="mr-2 h-4 w-4 " />
          {error}
        </div>
      ))}
    </div>
  );
};
