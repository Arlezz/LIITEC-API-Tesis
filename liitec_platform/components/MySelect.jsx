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
  <>
    <Select
      {...field}
      {...props}
      color="primary"
      classNames={{
        label: "text-black",
        trigger: [ "focus:ring-0","text-black"],
        value: ["text-black"],
      }}
      label={label}
      id={id}
      variant="bordered"
      labelPlacement="outside"
      //startContent={<PetIcon />}
      defaultSelectedKeys={[
        value === true ? "Active" : "Inactive",
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
