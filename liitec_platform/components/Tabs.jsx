"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Tabs({ links, id }) {
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <ul className="w-full list-none text-base flex flex-row gap-6 border-b-1 border-[#d6d7d8] overflow-x-auto md:overflow-hidden">
        {links.map((link, index) => (
          <li
            key={index}
            className={`
                    ${
                      pathname === `${link.href.replace("[id]", id)}`
                        ? "border-b-2 border-sky-600 !text-sky-600 hover:text-sky-600"
                        : ""
                    }
                    text-[#71717a] hover:text-[#b4b4b9] text-nowrap whitespace-nowrap`}
          >
            <Button
              radius="none"
              variant="ligth"
              as={Link}
              href={`${link.href.replace("[id]", id)}`}
            >
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
