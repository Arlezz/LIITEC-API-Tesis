"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { MySelect } from "../MySelect";
import { updateDevice } from "@/lib/general.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeviceSettingsAdmForm({ device, onClose }) {
  const deviceId = device?.deviceId ?? "";
  const channelId = device?.channelId ?? "";

  const [error, setError] = useState(null);
  const router = useRouter();

  function handleSubmit(channelId, deviceId, values) {
    updateDevice(channelId, deviceId, values)
      .then((response) => {
        router.push(`/admin/devices`);
        onClose();
      })
      .catch((error) => {
        console.log("Error al actualizar el dispositivo:", error.message);
        setError(error.message);
      });
  }

  useEffect(() => {
    let timeout;

    const hideError = () => {
      setError(null);
    };

    if (error) {
      timeout = setTimeout(hideError, 5000);
    }

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="">
      <Formik
        initialValues={{
          name: device?.name ?? "",
          description: device?.description ?? "",
          status: device?.isActive ?? false,
        }}
        validate={(values) => {
          const errors = {};

          if (values.name.length > 50) {
            errors.name = "Name must be at most 50 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name = "Name must only contain letters, numbers, and spaces";
          }

          if (values.description.length > 50) {
            errors.description =
              "Description must be at most 50 characters long";
          } else if (!/^[a-zA-Z0-9\s]*$/.test(values.name)) {
            errors.name =
              "Description must only contain letters, numbers, and spaces";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(channelId, deviceId, values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
              <div className="flex flex-col gap-4">
                {error && (
                  <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded-lg">
                    {error}
                  </p>
                )}
                <div className="">
                  <Field
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Name of the device"
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
                    placeholder="Description of the device"
                    component={MyTextArea}
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
                <div className="mt-2">
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    label="Status"
                    placeholder="Status of the device"
                    component={MySelect}
                    defaultSelectedKeys={[
                      values.status === true ? "true" : "false",
                    ]}
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    datas={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ]}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm font-semibold mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mb-4 mt-8 w-full">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
