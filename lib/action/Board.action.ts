"use server";

import { InputType, ReturnType } from "@/database/types";
import { auth } from "@clerk/nextjs";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { createSaveAction } from "../create-safe-action";
import { CreateBoard } from "@/database/Board";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "You must be logged in to create a board",
    };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (e) {
    return {
      error: "Failed to create board",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSaveAction(CreateBoard, handler);
