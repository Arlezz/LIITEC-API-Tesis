"use client";
import { useEffect, useState } from "react";
import LineChart from "@/components/LineChart";
import { getDeviceData } from "@/lib/general.actions";
import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import { capitalizeText } from "@/utils/capitalize";
import { getFormattedDate } from "@/utils/dateFormatter";

export default function RealtimeLineChart({
  device,
  variable,
  initialData,
  ...props
}) {
  const [data, setData] = useState(initialData);


  useEffect(() => {
    const fetchData = async () => {
      const newData = await getDeviceData(device, variable.variable, 1, 15);
      setData(newData.results);
    };

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [device, variable]);

  return (
    (
      <Card className="p-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h3 className="font-bold text-large mb-2">
            Graph of the {capitalizeText(variable.variable)} variable
          </h3>
          <h4 className="text-default-500 text-xs mb-1 text-ellipsis ">
            Device:{" "}
            {props.channels ? (
              <Link
                href={`/channels/${props.channels}/devices/${device}`}
                className="text-default-500 text-xs hover:underline "
              >
               {device}
              </Link>
            ) : (
              device
            )}
          </h4>

          {data && data.length > 0 && (
            <>
              <p className="text-tiny font-bold mb-1">
                Last entry: {getFormattedDate(data[0].timestamp)}
              </p>
              {/* <small className="text-default-500">Last 15 entries</small> */}
            </>
          )}
        </CardHeader>
        <CardBody className="overflow-visible ">
          <LineChart variable={variable} data={data} />
        </CardBody>
      </Card>
    )
  );
}
