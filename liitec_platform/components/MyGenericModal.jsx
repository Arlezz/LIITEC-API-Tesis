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

export default function MyGenericModal({
  title,
  subtitle,
  children,
  isOpen,
  onClose,
  handleAction,
  item,
  redirect,
  scrollBehavior,
  size,
  footerContent,
}) {
  const router = useRouter();

  const onConfirm = async () => {
    if (!handleAction) {
      return onClose();
    }

    await handleAction(item);
    if (redirect) {
      router.push(redirect);
    }
    onClose();
  };

  return (
    <Modal
      scrollBehavior={scrollBehavior ? scrollBehavior : "normal"}
      size={size ? size : "md"}
      placement="center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="my-4 sm:px-0">
                <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 max-w-2xl  leading-6 text-gray-500">
                    {subtitle}
                  </p>
                )}
              </div>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footerContent ? (
              footerContent === "none" ? null : (
                <ModalFooter>{footerContent}</ModalFooter>
              )
            ) : (
              // Renderiza los botones predeterminados solo si no se proporciona footerContent o es null/undefined
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={onConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            )}

            {/* {footerContent !== false
              ? <ModalFooter>{footerContent}</ModalFooter> || (
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={onConfirm}>
                      Confirm
                    </Button>
                  </ModalFooter>
                )
              : null} */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
