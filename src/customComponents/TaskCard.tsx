import { useDraggable } from "@dnd-kit/core";
import { TrashIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
  deleteTask: (id: string) => void;
  setEditingTask: (task: Task) => void;
  setOpenDialog: (open: boolean) => void;
};

export function TaskCard({
  task,
  deleteTask,
  setEditingTask,
  setOpenDialog,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-grab relative"
      style={style}
    >
      {/* Task Content */}
      <h3 className="font-semibold text-gray-800">{task.title}</h3>
      {task.description && (
        <p className="mt-2 text-sm text-gray-600">{task.description}</p>
      )}
      <p className="mt-2 text-xs text-gray-500">{task.createdAt}</p>

      {/* Buttons */}
      <div
        className={`absolute top-2 right-2 flex gap-2 ${
          isDragging ? "pointer-events-none" : ""
        }`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Edit button clicked for task:", task.id);
            setEditingTask(task);
            setOpenDialog(true);
          }}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Deleting task with ID:", task.id);
            deleteTask(task.id);
          }}
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
