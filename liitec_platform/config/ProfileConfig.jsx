import { UserIcon, Settings, Code2 } from "lucide-react";



const ProfileLinks = [
  { label: "My Account", href: "/profile", icon: <UserIcon />},
  { label: "Settings", href: "/profile/settings", icon: <Settings/>},
  { label: "Api Credentials", href: "/profile/api-credentials", icon: <Code2/>},
];

export {
    ProfileLinks,
};
