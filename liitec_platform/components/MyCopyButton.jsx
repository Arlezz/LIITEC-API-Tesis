"use client";

import { Link } from "@nextui-org/react";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function MyCopyButton({ label, herf }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCopy = () => {
    try {
      // Crea un elemento de texto oculto
      const textArea = document.createElement("textarea");
      textArea.value = herf;

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

      // Muestra el tooltip después de copiar
      setIsTooltipVisible(true);

      // Oculta el tooltip después de un tiempo (por ejemplo, 2 segundos)
      setTimeout(() => {
        setIsTooltipVisible(false);
      }, 2000);

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="relative inline-block">
    <Link
        className="text-gray-700 gap-1 hover:underline hover:cursor-pointer"
        size="sm"
        showAnchorIcon
        onClick={handleCopy}
        anchorIcon={<Copy size={15} />}
      >
        {label}
      </Link>
      {isTooltipVisible && (
        <div className="absolute left-full p-2 bg-gray-700 text-white rounded whitespace-nowrap">
          Copiado!
        </div>
      )}
      
    </div>
  );
}
