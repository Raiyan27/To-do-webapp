import { useDraggable } from "@dnd-kit/core";
import { TrashIcon, PencilIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "./types";
import { useEffect, useState } from "react";

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
      id: task.taskId,
    });

  const formattedDate = new Date(task.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isNearEdge, setIsNearEdge] = useState(false);

  const checkEdgeProximity = (event: TouchEvent) => {
    const touch = event.touches[0];
    const screenHeight = window.innerHeight;

    const topThreshold = 100;
    const bottomThreshold = 100;

    if (
      touch.clientY < topThreshold ||
      touch.clientY > screenHeight - bottomThreshold
    ) {
      setIsNearEdge(true);
    } else {
      setIsNearEdge(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.touchAction = "none";
      window.addEventListener("touchmove", checkEdgeProximity, {
        passive: false,
      });
    } else {
      document.body.style.touchAction = "";
      window.removeEventListener("touchmove", checkEdgeProximity);
    }

    return () => {
      document.body.style.touchAction = "";
      window.removeEventListener("touchmove", checkEdgeProximity);
    };
  }, [isDragging]);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md relative"
      style={{
        ...style,
        touchAction: isNearEdge ? "auto" : "none",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <h3 className="font-semibold text-gray-800">{task.title}</h3>
      {task.description && (
        <p className="mt-2 text-sm text-gray-600">{task.description}</p>
      )}
      <p className="mt-2 text-xs text-gray-500">{formattedDate}</p>

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
            console.log("Edit button clicked for task:", task.taskId);
            setEditingTask(task);
            setOpenDialog(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Deleting task with ID:", task.taskId);
            deleteTask(task.taskId);
          }}
          style={{ cursor: "pointer" }}
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>

      <div
        {...listeners}
        {...attributes}
        className="cursor-grab absolute bottom-2 right-2 z-10"
      >
        <GripVerticalIcon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  );
}
