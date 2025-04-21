import { rootRoute } from "./__root";
import { indexRoute } from "./index";
import { userRoute } from "./user.$id";

export const routeTree = rootRoute.addChildren([indexRoute, userRoute]);
