import { post, del } from "api";

export const createTag = async (body: any) => {
  return await post("tag", { ...body });
};

export const deleteTag = async (id: string) => {
  return await del(`tag/${id}`, );
};