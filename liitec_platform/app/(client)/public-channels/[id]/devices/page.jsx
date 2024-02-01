"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DevicesPage({ params }) {
    const router = useRouter();

    useEffect(() => {
        router.push(`/channels/${params.id}`);
    }, [params.id,router]);

    return null;
}