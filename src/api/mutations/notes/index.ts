import { del, get, post, put } from "../..";

export const createNote = async (body: any) => {
  return await post("note", { ...body });
};

export const updateNote = async (id: any, body: any) => {
  return await put(`note/${id}`, { ...body });
};

export const singleNote = async (id: any) => {
  return await get(`note/${id}`);
};

export const filterNote = async (category: any, tag: any) => {
  let url = 'notes/filter'
  if (category) url += `/${category}`
  if (tag) url += `/${tag}`
  return await get(url);
};

export const deleteNote = async (id: any) => {
  return await del(`note/${id}`);
};
