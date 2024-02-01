import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.SECRET,
});

export const config = {
  matcher: [
    "/channels",
    "/channels/:path*",
    "/public-channels",
    "/public-channels/:path*",
    "/invited-channels",
    "/invited-channels/:path*",
    "/support",
    "/profile",
    "/profile/:path*",
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
