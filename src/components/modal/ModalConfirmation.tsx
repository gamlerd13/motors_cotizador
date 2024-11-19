import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface CustomModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  onOpenChange: () => void;
}

export const ModalConfirmation: React.FC<CustomModalProps> = ({
  title,
  content,
  isOpen,
  onOpenChange,
  onClick,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="text-center">{content}</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="faded"
                  onPress={() => onClose()}
                >
                  cerrar
                </Button>
                <Button
                  color="default"
                  onPress={() => {
                    onClick();
                    onClose();
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
