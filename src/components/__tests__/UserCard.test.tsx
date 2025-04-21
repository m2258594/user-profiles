import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

import { UserCard } from "../UserCard";
import { UserStatusType } from "../../constants/statuses";

describe("UserCard", () => {
  const mockUser = {
    id: "1",
    fullName: "Иван Иванов",
    phone: "+7 (999) 123-45-67",
    status: "active" as UserStatusType,
  };

  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
    expect(screen.getByText("+7 (999) 123-45-67")).toBeInTheDocument();
    expect(screen.getByText("Активный")).toBeInTheDocument();
  });

  it("renders user with deleted status", () => {
    mockUser.status = "deleted";
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("Удалённый")).toBeInTheDocument();
  });

  it("renders user with inactive status", () => {
    mockUser.status = "inactive";
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("Неактивный")).toBeInTheDocument();
  });
});
