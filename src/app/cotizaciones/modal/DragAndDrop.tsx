import { CotizacionGet } from "@/models/cotizacion";
import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import React, { act } from "react";
import { FileObject } from "../types/main";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@nextui-org/button";
import { BiTrash } from "react-icons/bi";

function DragAndDrop({
  pdfFiles,
  setPdfFiles,
  removePdfFile,
}: {
  pdfFiles: FileObject[];
  setPdfFiles: (pdfFiles: FileObject[]) => void;
  removePdfFile: (id: number) => void;
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const oldIndex = pdfFiles.findIndex((file) => file.id === active.id);
      const newIndex = pdfFiles.findIndex((file) => file.id === over.id);

      const newOder = arrayMove(pdfFiles, oldIndex, newIndex);
      setPdfFiles(newOder);
    }
  };

  if (pdfFiles.some((file) => !file.file)) return;
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="w-full text-sm ">
        {pdfFiles.length > 0 && (
          <div className="flex flex-col gap-2  justify-between">
            <SortableContext
              items={pdfFiles}
              strategy={verticalListSortingStrategy}
            >
              {pdfFiles.map((fileObject, index) => (
                <PdfFile
                  fileObject={fileObject}
                  index={index}
                  key={index}
                  removePdfFile={removePdfFile}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    </DndContext>
  );
}

const PdfFile = ({
  fileObject,
  index,
  removePdfFile,
}: {
  fileObject: FileObject;
  index: number;
  removePdfFile: (id: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: fileObject.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!fileObject.file) return <Spinner />;
  return (
    <Card
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className=" w-full rounded-md bg-default cursor-move"
    >
      <CardBody className=" overflow-hidden">
        <div className="flex flex-nowrap justify-between items-center">
          <span>{fileObject.file.name}</span>
          {fileObject.id !== 0 && (
            <Button
              onClick={() => removePdfFile(fileObject.id)}
              type="button"
              className="bg-rose-700 text-white text-lg"
              size="sm"
            >
              <BiTrash />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default DragAndDrop;
