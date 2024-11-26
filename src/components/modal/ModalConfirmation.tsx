import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface CustomModalProps {
  title: string;
  contentString?: string;
  contentComponent?: React.JSX.Element;
  isOpen: boolean;
  onClick?: () => void;
  onOpenChange: () => void;
}

export const ModalConfirmation: React.FC<CustomModalProps> = ({
  title,
  contentString,
  contentComponent,
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
                <div className="text-center text-sm">{contentString}</div>
                {contentComponent && contentComponent}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  size="sm"
                  variant="faded"
                  onPress={() => onClose()}
                >
                  cerrar
                </Button>
                {onClick && (
                  <Button
                    size="sm"
                    color="default"
                    onPress={() => {
                      onClick();
                      onClose();
                    }}
                  >
                    Aceptar
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
