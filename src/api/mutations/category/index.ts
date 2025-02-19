import { del, post } from "api";

export const createCategory = async (body: any) => {
  return await post("category/create", { ...body });
};

export const deleteCategory = async (id: string) => {
  return await del(`category/delete/${id}`, );
};