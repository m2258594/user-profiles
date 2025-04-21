import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

import HomePage from "../../pages/HomePage";
import * as api from "../../api/client/getAllUsers";
import { useFilterStore } from "../../store/useFilterStore";
import { UserStatus } from "../../constants/statuses";

vi.mock("../../api/client/getAllUsers", async () => {
  const actual = await vi.importActual<typeof api>(
    "../../api/client/getAllUsers"
  );
  return {
    ...actual,
    getAllUsers: vi.fn().mockResolvedValue([
      {
        id: "1",
        fullName: "Иван Иванов",
        phone: "+7 (123) 456-78-90",
        status: "active",
      },
      {
        id: "2",
        fullName: "Сергей Петров",
        phone: "+7 (987) 654-32-10",
        status: "inactive",
      },
      {
        id: "3",
        fullName: "Дмитрий Смирнов",
        phone: "+7 (123) 456-78-90",
        status: "deleted",
      },
    ]),
  };
});

beforeEach(() => {
  useFilterStore.setState({ filter: "" });
});

describe("HomePage", () => {
  it("renders filtered users correctly", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
      expect(screen.getByText("Сергей Петров")).toBeInTheDocument();
      expect(screen.getByText("Дмитрий Смирнов")).toBeInTheDocument();
    });

    act(() => {
      useFilterStore.getState().setFilter(UserStatus.ACTIVE);
    });

    await waitFor(() => {
      expect(screen.queryByText("Иван Иванов")).toBeInTheDocument();
      expect(screen.queryByText("Сергей Петров")).not.toBeInTheDocument();
      expect(screen.queryByText("Дмитрий Смирнов")).not.toBeInTheDocument();
    });
  });
});
