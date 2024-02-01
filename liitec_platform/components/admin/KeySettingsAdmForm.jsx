"use client";

import { Link, Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCcw, Info } from "lucide-react";
import { updateKey } from "@/lib/auth.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function KeySettingsAdmForm({ keyItem, onClose }) {
  const { data: session, update } = useSession();

  const sessionKey = session?.user?.apiKey?.key;
  const secret = keyItem.key;
  const userId = keyItem.user;
  const router = useRouter();

  const [showKey, setShowKey] = useState(false);
  const handleShowKey = () => {
    setShowKey((prevShowKey) => !prevShowKey);
  };

  const handleResetKey = () => {
    const value = {
      regenerateApiKey: true,
    };
    updateKey(userId, value)
      .then(async (response) => {

        if (sessionKey === secret) {
          const newKey = response.updatedFields.key;
          await update({
            ...session,
            user: {
              ...session.user,
              apiKey: {
                ...session.user.apiKey,
                key: newKey,
              },
            },
          });

          router.push("/admin/keys");
          router.refresh();
        } else {
          router.push("/admin/keys");
          router.refresh();
        }
      })
      .catch((error) => {
        console.log("Error al actualizar el usuario:", error);
        //setError(error.message);
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
    <div className=" flex flex-col gap-4">
      <h2 className="text-base text-gray-700 font-medium">Api Credentials</h2>
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
      {!(secret === sessionKey) ? (
        <p className="flex text-sm items-center gap-2 pt-2 text-default-500">
          * This action will close the current session of the user in question.
        </p>
      ) : null}

      <div className="flex gap-2 justify-end mb-4 mt-8 w-full">
        <Button color="primary" onClick={() => onClose()}>
          Volver
        </Button>
      </div>
    </div>
  );
}
