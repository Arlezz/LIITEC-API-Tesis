"use client"

import { Button } from "@nextui-org/react";
import { exportChannelData } from "@/lib/general.actions";
import { FileUp } from "lucide-react";

export default function ExportChannelDataButton({ channelId }) {
  const handleExport = () => {

    exportChannelData(channelId)
      .then((response) => {

        const blob = new Blob([response], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${channelId}_Data.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

      })
      .catch((error) => {
        console.log("Error al exportar los datos:", error.message);
      });

  };

  return (
    <Button
      color="success"
      endContent={<FileUp size={18} />}
      onClick={handleExport}
      //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Export Data
    </Button>
  );
}
