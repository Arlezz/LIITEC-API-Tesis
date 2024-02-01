"use client";
import { Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyInput } from "../MyInput";
import { MyTextArea } from "../MyTextArea";
import { createDevice } from "@/lib/general.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MySelect } from "../MySelect";
import { deviceTypes } from "@/utils/deviceTypes";

export default function DeviceCreationForm({ channelId }) {


  const [error, setError] = useState(null);
  const router = useRouter();


  function handleSubmit(channelId, values) {

    
    const mappedDevice = deviceTypes.find(device => device.value === values.type);

    const device = {
      name: values.name,
      description: values.description,
      model: mappedDevice.value,
      type: mappedDevice.type,
      measures: mappedDevice.measures
    }


    createDevice(channelId, device)
      .then((response) => {
        router.push(`/channels/${channelId}`);
      })
      .catch((error) => {
        console.log("Error al crear el canal:", error.message);
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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "",
        }}
        validate={(values) => {
          const errors = {};

          if (values.name && values.name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
          } else if (values.name && values.name.length > 25) {
            errors.name = "Name must be at most 25 characters long";
          } else if (values.name && !/^[a-zA-Z0-9\s]+$/.test(values.name)) {
            errors.name = "Name must only contain letters and spaces";
          }
          

          if (values.description && values.description.length < 3) {
            errors.description = "Description must be at least 3 characters long";
          } else if (values.description && values.description.length > 50) {
            errors.description = "Description must be at most 50 characters long";
          } else if (values.description && !/^[a-zA-Z0-9\s]+$/.test(values.description)) {
            errors.description = "Description must only contain letters and spaces";
          }

          if (values.type !== "DHT22" && values.type !== "MQ135" && values.type !== "GYML8511") {
            errors.type = "Device type must be DHT22, MQ135 or GYML8511";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(channelId, values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
              {error && (
                <p className="bg-red-500 text-white p-3 text-sm font-semibold rounded-lg">
                  {error}
                </p>
              )}
              <div className="">
                <Field
                  id="name"
                  name="name"
                  label="Name (Optional)"
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
                  label="Description (Optional)"
                  placeholder="Description of the channel"
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
                  id="type"
                  name="type"
                  label="Device Type"
                  placeholder="Specify the type of device"
                  component={MySelect}
                  
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}

                  datas={deviceTypes}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm font-semibold mt-1"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" color="primary">
                Create Device
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
