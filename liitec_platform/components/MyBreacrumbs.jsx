"use client";

import { usePathname } from "next/navigation";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function MyBreacrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <Breadcrumbs
      //color="primary"
      className="capitalize"
      itemClasses={{

        item: "text-sky-700",
      }}
    >
      {segments.map((segment, index) => {
        if (segment === "") {
          return null;
        } else {
          return (
            <BreadcrumbItem
              key={index}
              href={`${segments.slice(0, index + 1).join("/")}`}
            >
              {segment}
            </BreadcrumbItem>
          );
        }
      })}
    </Breadcrumbs>
  );
}
