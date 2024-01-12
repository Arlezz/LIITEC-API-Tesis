import Image from "next/image";



export default function Page() {
  return (
    <>
      <Image
            className="mx-auto h-14 w-auto"
            src="/LIITEC_LOGO_V2.svg"
            alt="Liitec Logo"
            width={1000}
            height={1000}
          />
    </>
  );
}
