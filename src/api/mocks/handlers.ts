import { usersMock } from "./users";

export const fetchMock = async (url: string): Promise<Response> => {
  await randomDelay();

  if (Math.random() < 0.3) {
    return createMockError("Ошибка сервера", 500);
  }

  if (url === "/users") {
    const previewData = usersMock.map(({ id, fullName, status, phone }) => ({
      id,
      fullName,
      status,
      phone,
    }));
    return createMockResponse(previewData);
  }

  if (url.startsWith("/user/")) {
    const [, , id] = url.split("/");
    const user = usersMock.find((el) => el.id === id);

    if (!user) {
      return createMockError("Пользователь не найден", 404);
    }

    return createMockResponse(user);
  }

  return createMockError("Неизвестный эндпоинт", 400);
};

const randomDelay = async () => {
  const delay = Math.random() * 1000 + 300;
  return new Promise((res) => setTimeout(res, delay));
};

const createMockResponse = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const createMockError = (message: string, status = 500): Response =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
