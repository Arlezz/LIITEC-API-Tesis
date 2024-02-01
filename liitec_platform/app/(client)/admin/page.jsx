"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/admin/users`);
  }, [router]); // Agrega 'router' al array de dependencias

  return null;
}
