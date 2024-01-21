import dynamic from "next/dynamic";

const GenericTable = dynamic(() => import("./GenericTable"), {
  ssr: false,
});

export default GenericTable;