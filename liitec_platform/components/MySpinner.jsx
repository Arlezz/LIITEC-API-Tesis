import { Spinner } from "@nextui-org/react"

export default function MySpinner() {
    return (
    <div className="p-14 flex items-center justify-center">
      <Spinner color="primary" size="lg" label="Loading..." labelColor="primary"/>
    </div>);
}