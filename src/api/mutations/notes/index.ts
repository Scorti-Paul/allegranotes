import { post, put } from "../..";

export const createNote = async (body: any) => {
  return await post("note/create", { ...body });
};

export const updateNote = async (body: any) => {
  return await put("note/update", { ...body });
};
