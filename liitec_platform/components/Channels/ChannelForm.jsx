"use client";

import { Input, Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { MySelect } from "../MySelect";

export default function ChannelForm({ channel }) {
  const handleSave = (values) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Formik
        initialValues={{
          name: channel?.name ?? "",
          description: channel?.description ?? "",
          latitude: channel?.ubication?.latitude ?? "",
          longitude: channel?.ubication?.longitude ?? "",
          status: channel?.isActive === true ? "Active" : "Inactive",
          visibility: channel?.isPublic === true ? "Public" : "Private",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is required";
          } else if (values.name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
          } else if (values.name.length > 25) {
            errors.name = "Name must be at most 25 characters long";
          } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
            errors.name = "Name must only contain letters and spaces";
          }

          if (!values.description) {
            errors.description = "Description is required";
          } else if (values.description.length < 3) {
            errors.description =
              "Description must be at least 3 characters long";
          } else if (values.description.length > 50) {
            errors.description =
              "Description must be at most 50 characters long";
          } else if (!/^[a-zA-Z\s]+$/.test(values.description)) {
            errors.description =
              "Description must only contain letters and spaces";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSave(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
              <div className="">
                <Field
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Name of the channel"
                  component={MyInput}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
              <div className="mt-2">
                <Field
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Description of the channel"
                  component={MyTextArea}
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mt-2">
                <Input
                  color="primary"
                  classNames={{
                    label: "text-black",
                    input: ["border-0", "focus:ring-0", "p-0"],
                  }}
                  variant="bordered"
                  type="text"
                  label="Project"
                  placeholder="Project of the channel"
                  labelPlacement="outside"
                  value={channel?.project ?? ""}
                />
              </div>
              <div className="mt-2">
                <Input
                  color="primary"
                  classNames={{
                    label: "text-black",
                    input: ["border-0", "focus:ring-0", "p-0"],
                  }}
                  variant="bordered"
                  type="text"
                  label="Latitude"
                  placeholder="Latitude of the channel"
                  labelPlacement="outside"
                  value={channel?.ubication?.latitude ?? ""}
                />
              </div>
              <div className="mt-2">
                <Input
                  color="primary"
                  classNames={{
                    label: "text-black",
                    input: ["border-0", "focus:ring-0", "p-0"],
                  }}
                  variant="bordered"
                  type="text"
                  label="Longitude"
                  placeholder="Longitude of the channel"
                  labelPlacement="outside"
                  value={channel?.ubication?.longitude ?? ""}
                />
              </div>
              <div className="mt-2">
                <Field
                  type="select"
                  id="description"
                  name="description"
                  label="Status"
                  placeholder="Status of the channel"
                  component={MySelect}
                  //value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  datas={[
                    { value: "true", label: "Active" },
                    { value: "false", label: "Inactive" },
                  ]}
                />
                <Input
                  color="primary"
                  classNames={{
                    label: "text-black",
                    input: ["border-0", "focus:ring-0", "p-0"],
                  }}
                  variant="bordered"
                  type="text"
                  label="Status"
                  placeholder="Status of the channel"
                  labelPlacement="outside"
                  value={channel?.isActive ?? ""}
                />
              </div>
              <div className="mt-2">
                <Input
                  color="primary"
                  classNames={{
                    label: "text-black",
                    input: ["border-0", "focus:ring-0", "p-0"],
                  }}
                  variant="bordered"
                  type="text"
                  label="Visibility"
                  placeholder="Visibility of the channel"
                  labelPlacement="outside"
                  value={channel?.isPublic ?? ""}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
