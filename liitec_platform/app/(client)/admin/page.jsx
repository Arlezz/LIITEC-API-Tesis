"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/admin/users`);
  }, []);

  return null;

  // return (
  //   <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
  //       <h1>Admin page</h1>
  //   </div>
  // );
}
