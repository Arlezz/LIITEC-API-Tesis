import { Spinner } from "@nextui-org/react";

export default function SupportPage() {
  return (
    <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
        <h1>Support Page</h1>
        <Spinner color="primary" size="lg" label="Loading..." labelColor="primary"/>
    </div> 
  );
}
