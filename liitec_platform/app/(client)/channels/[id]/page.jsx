"use client"


import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function ChannelDetailPage({ params }) {

  const router = useRouter();

  useEffect(() => {
    router.push(`/channels/${params.id}/devices`);
  }, []);


  return (null);
}
