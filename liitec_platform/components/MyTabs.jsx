"use client"

import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function MyTabs({channelId}) {

    const pathname = usePathname();
    console.log(pathname);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Navigation" 
        color="primary" 
        variant="underlined"
        
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-sky-600",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-sky-600 text-base px-2"
        }} >
        <Tab key="photos" title="Devices">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Views">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="otra" title="Otra">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="cosa" title="Cosa">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="mas" title="Mas">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}