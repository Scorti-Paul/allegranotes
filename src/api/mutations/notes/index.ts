import { del, get, post, put } from "../..";

export const createNote = async (body: any) => {
  return await post("note/create", { ...body });
};

export const updateNote = async (body: any) => {
  return await put("note/update", { ...body });
};

export const singleNote = async (id: any) => {
  return await get(`note/${id}`);
};

export const deleteNote = async (id: any) => {
  return await del(`note/delete/${id}`);
};
