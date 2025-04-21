import { userPreviewSchema } from "../../validation/userSchema";
import { fetchMock } from "../mocks/handlers";

export const getAllUsers = async () => {
  const response = await fetchMock("/users");

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error ?? "Ошибка загрузки пользователей");
  }

  const data = await response.json();
  return userPreviewSchema.array().parse(data);
};
