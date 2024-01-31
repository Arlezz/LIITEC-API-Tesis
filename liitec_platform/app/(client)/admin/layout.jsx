import { AdminLinks } from "@/config/Admin/AdminConfig";
import Tabs from "@/components/Tabs";

export default function Layout({ children }) {
  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
      <div className="w-full">
        <Tabs links={AdminLinks} />
        {children}
      </div>
    </div>
  );
}
