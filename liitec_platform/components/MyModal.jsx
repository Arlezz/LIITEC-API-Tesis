import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

export default function MyModal({ title, content, isOpen, onClose, handleDelete, item, redirect}) {

  const router = useRouter();

  function onConfirm() {
    handleDelete(item);
    router.push(redirect);
    onClose();
  }

  return (
    <Modal size="sm" placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>
              <p>
                {content}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={onConfirm}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
