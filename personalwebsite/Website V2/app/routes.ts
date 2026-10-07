import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("BagelIsLost", "routes/bagel-is-lost.tsx"),
] satisfies RouteConfig;
