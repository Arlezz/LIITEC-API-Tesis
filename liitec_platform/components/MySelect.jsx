import { Select, SelectItem } from "@nextui-org/react";

export const MySelect = ({
  datas,  
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  ...props
}) => (
  // console.log("MySelect", datas),
  // console.log("Valueee", value),
  <>
    <Select
      {...field}
      {...props}
      color="primary"
      classNames={{
        label: "text-black font-medium",
        trigger: [ "focus:ring-0","text-black"],
        value: ["text-black"],
      }}
      label={label}
      id={id}
      variant="bordered"
      labelPlacement="outside"
      defaultSelectedKeys={[
        value === true ? "true" : "false"
      ]}
    >
      {datas.map((data) => (
        <SelectItem key={data.value} value={data.value}>
          {data.label}
        </SelectItem>
      ))}
    </Select>
  </>
);
