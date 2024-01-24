import { Textarea } from "@nextui-org/react";

export const MyTextArea = ({
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  ...props
}) => (
  <Textarea
    {...field}
    {...props}
    color="primary"
    classNames={{
        label: "text-black font-medium",
        input: ["border-0", "focus:ring-0", "p-0", "resize-y min-h-[40px]"],
    }}
    // classNames={{
    //   label: "text-black",
    //   input: ["border-0", "focus:ring-0", "p-0"],
    // }}
    label={label}
    id={id}
    type="text"
    variant="bordered"
    labelPlacement="outside"
  />
);
