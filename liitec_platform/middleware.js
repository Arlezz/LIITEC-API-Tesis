import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.SECRET,
});

export const config = {
  matcher: [
    "/channels",
    "/channels/:path*",
    "/public-channels",
    "/support",
    "/profile",
    "/profile/:path*",
    "/",
    "/dashboard",
    "/admin",
  ],
};
