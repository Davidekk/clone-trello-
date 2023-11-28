"use client";

import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/lib/action/Board.action";
import { FormSubmit } from "@/components/form/form-button";

const From = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput id="title" errors={fieldErrors} label="Board title" />
      <FormSubmit> Save title</FormSubmit>
    </form>
  );
};

export default From;
