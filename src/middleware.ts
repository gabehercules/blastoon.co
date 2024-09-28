export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/marketplace",
    "/marketplace/:path*",
    "/guilds",
    "/settings",
    "/profile",
    "/portals",
    "/raids",
    "/leaderboards",
  ],
};
