import { post, put } from "../..";

export const registerUser = async (body: any) => {
  return await post("user/sign-up", { ...body });
};

export const updateUser = async (body: any) => {
  return await put("user/update", { ...body });
};

export const loginUser = async (body: any) => {
  return await post("user/login", { ...body });
};