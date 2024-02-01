"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({ links, ids }) {
  const pathname = usePathname();


  return (
    <div className="mb-6">
      <ul className="w-full list-none text-base flex flex-row gap-6 border-b-1 border-[#71717a] overflow-x-auto md:overflow-hidden">
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
              startContent={link.icon? link.icon : null}
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
  // Si no hay IDs, devolver el path original
  if (!ids || ids.length === 0) {
    return path;
  }

  let dynamicPath = path;

  // Replace each dynamic segment in the path with the corresponding id
  ids.forEach((id, index) => {
    const placeholder = `[id${index + 1}]`;

    // Verificar si el placeholder está presente antes de realizar la sustitución
    if (dynamicPath.includes(placeholder)) {
      dynamicPath = dynamicPath.replace(placeholder, id);
    } else {
      // Puedes manejar esta situación de alguna manera, como imprimir un mensaje de error
      console.error(`Placeholder "${placeholder}" not found in the path: ${path}`);
    }
  });

  return dynamicPath;
}

