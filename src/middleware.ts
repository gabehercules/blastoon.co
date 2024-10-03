export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/marketplace",
    "/marketplace/:path*",
    "/inventory",
    "/guilds",
    "/settings",
    "/profile",
    "/portals",
    "/raids",
    "/leaderboards",
  ],
};
