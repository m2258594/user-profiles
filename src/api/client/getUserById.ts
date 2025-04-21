import { userSchema } from "../../validation/userSchema";
import { fetchMock } from "../mocks/handlers";

export const getUserById = async (id: string) => {
  const response = await fetchMock(`/user/${id}`);

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error ?? "Ошибка загрузки пользователя");
  }

  const data = await response.json();
  return userSchema.parse(data);
};
