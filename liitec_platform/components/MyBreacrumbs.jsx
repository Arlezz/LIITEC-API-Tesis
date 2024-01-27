"use client"

import { usePathname } from "next/navigation";

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function MyBreacrumbs() {

    const pathname = usePathname();

    console.log("EL pathname", pathname);

  return (
    <Breadcrumbs>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Music</BreadcrumbItem>
      <BreadcrumbItem>Artist</BreadcrumbItem>
      <BreadcrumbItem>Album</BreadcrumbItem>
      <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>
  );
}
