import { Users, MemoryStick, Cpu, KeyRound } from "lucide-react";

const AdminLinks = [
  { label: "Users", href: "/admin/users", icon: <Users />},
  { label: "Channels", href: "/admin/channels", icon: <Cpu/>},
  { label: "Devices", href: "/admin/devices", icon: <MemoryStick/>},
  { label: "Keys", href: "/admin/keys", icon: <KeyRound/>},
];

export {
    AdminLinks,
};
