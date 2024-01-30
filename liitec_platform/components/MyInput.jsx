import { Input } from "@nextui-org/react";

export const MyInput = ({
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  ...props
}) => (
  <Input
    {...field}
    {...props}
    color="primary"
    classNames={{
      label: "text-black font-medium z-0",
      input: ["border-0", "focus:ring-0", "p-0"],
    }}
    
    label={label}
    id={id}
    variant="bordered"
    labelPlacement="outside"
  />
);
