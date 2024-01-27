"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({ links, ids }) {
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <div className="mb-6">
      <ul className="w-full list-none text-base flex flex-row gap-6 border-b-1 border-[#d6d7d8] overflow-x-auto md:overflow-hidden">
        {links.map((link, index) => (
          <li
            key={index}
            className={`
              ${
                pathname === 
                  generateDynamicPath(link.href, ids)
                
                  ? "border-b-2 border-sky-600 !text-sky-600 hover:text-sky-600"
                  : ""
              }
              text-[#71717a] hover:text-[#b4b4b9] text-nowrap whitespace-nowrap`}
          >
            <Button
              radius="none"
              variant="ligth"
              className="text-base"
              as={Link}
              href={generateDynamicPath(link.href, ids)}
            >
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function generateDynamicPath(path, ids) {
  let dynamicPath = path;

  // Replace each dynamic segment in the path with the corresponding id
  ids.forEach((id, index) => {
    dynamicPath = dynamicPath.replace(`[id${index + 1}]`, id);
  });

  return dynamicPath;
}
