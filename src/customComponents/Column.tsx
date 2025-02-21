import { useDroppable } from "@dnd-kit/core";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";
import type { Column as ColumnType, Task } from "./types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  deleteTask: (id: string) => void;
  setEditingTask: (task: Task) => void;
  setOpenDialog: (open: boolean) => void;
};

export function Column({
  column,
  tasks,
  deleteTask,
  setEditingTask,
  setOpenDialog,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const columnStyle = {
    border: isOver ? "2px dashed #007bff" : "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    minHeight: "100px",
    transition: "background-color 0.2s, border 0.2s",
  };
  return (
    <Card
      ref={setNodeRef}
      style={columnStyle}
      className={`p-4 shadow-lg ${column.color}`}
    >
      <CardHeader>
        <CardTitle className="capitalize text-center">{column.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                setOpenDialog={setOpenDialog}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No tasks here yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
