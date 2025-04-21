import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import UserPage from "../pages/UserPage";

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$id",
  component: UserPage,
});
