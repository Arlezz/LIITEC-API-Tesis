"use client";

import { Link, Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { updateKey } from "@/lib/auth.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SecretSection({ id, secret, label, herf }) {
  const router = useRouter();

  const { data : session, update } = useSession();


  const [showKey, setShowKey] = useState(false);
  const handleShowKey = () => {
    setShowKey((prevShowKey) => !prevShowKey);
  };

  const handleResetKey = () => {
    const value = {
      regenerateApiKey: true,
    };
    updateKey(id, value)
      .then(async (response) => {
        const newKey = response.updatedFields.key;
        await update(
          {
            ...session,
            user: {
              ...session.user,
              apiKey: {
                ...session.user.apiKey,
                key: newKey,
              },
            },
          }
        );
        
        router.push("/profile/api-credentials");
        router.refresh();
      })
      .catch((error) => {
        console.log("Error al actualizar el usuario:", error);
      });
  };

  const handleCopy = (value) => {
    try {
      // Crea un elemento de texto oculto
      const textArea = document.createElement("textarea");
      textArea.value = value;

      // Agrega el elemento al DOM
      document.body.appendChild(textArea);

      // Crea y selecciona el contenido del elemento
      const range = document.createRange();
      range.selectNode(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Ejecuta el comando de copiar
      document.execCommand("copy");

      // Remueve el elemento del DOM
      document.body.removeChild(textArea);

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className=" flex flex-col md:flex-row md:justify-between md:items-center ">
      <div className=" flex flex-row items-center  leading-6 bg-[#f2f2f2] px-3 py-1 rounded text-gray-700 sm:col-span-2 sm:mt-0">
        {showKey ? secret : "*************************************"}
      </div>
      <div className="flex gap-3 md:gap-2  mt-2 md:m-0">
        <Tooltip showArrow={true} content={showKey ? "Hide" : "Show"}>
          <Button
            variant="flat"
            size="sm"
            className=""
            isIconOnly
            onClick={handleShowKey}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </Tooltip>
        <Tooltip showArrow={true} content="Copy">
          <Button
            variant="flat"
            size="sm"
            isIconOnly
            onClick={handleCopy(secret)}
            className=""
          >
            <Copy size={16} />
          </Button>
        </Tooltip>
        <Tooltip showArrow={true} content="Reset Api Key">
          <Button
            variant="flat"
            size="sm"
            isIconOnly
            onClick={handleResetKey}
            className=""
          >
            <RefreshCcw size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
