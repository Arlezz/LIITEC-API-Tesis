"use client";

import MyGenericModal from "./MyGenericModal";
import { Chip, Code, Button } from "@nextui-org/react";
import { getFormattedDate } from "@/utils/dateFormatter";
import MyCopyButton from "./MyCopyButton";
import UserSettingsAdmForm from "./admin/UserSettingsAdmForm";
import ChannelSettingsAdmForm from "./admin/ChannelSettingsAdmForm";
import DeviceSettingsAdmForm from "./admin/DeviceSettingsAdmForm";
import KeySettingsAdmForm from "./admin/KeySettingsAdmForm";

import { useState } from "react";

const MyEditModal = ({
  isOpen,
  onClose,
  item,
  handleEdit,
  redirectPostEdit,
}) => {
  const renderContent = () => {
    // Lógica para renderizar el contenido según el tipo de objeto
    if (!item) {
      return <p>Item is null or undefined</p>;
    }

    if (item._id) {
      // Es un usuario
      return <UserSettingsAdmForm user={item} onClose={onClose} />;
    } else if (item.channelId && item.owner) {
      // Es un canal
      return <ChannelSettingsAdmForm channel={item} onClose={onClose} />;
    } else if (item.deviceId && item.channelId) {
      // Es un dispositivo
      return <DeviceSettingsAdmForm device={item} onClose={onClose}/>;
    } else if (item.key) {
      // Es una clave
      return <KeySettingsAdmForm keyItem={item} onClose={onClose} />;
    } else {
      // Tipo de objeto no reconocido
      return <p>Objeto no reconocido</p>;
    }
  };


  return (
    <MyGenericModal
      size={"xl"}
      scrollBehavior="outside"
      title="Item Settings"
      subtitle={"Editable fields  of the selected item"}
      isOpen={isOpen}
      onClose={onClose}
      //handleAction={handleEdit}
      redirect={redirectPostEdit}
      footerContent="none"
      // Puedes agregar más props específicas si es necesario
    >
      {renderContent()}
    </MyGenericModal>
  );
};

export default MyEditModal;
