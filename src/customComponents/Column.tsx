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
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Card ref={setNodeRef} className={`p-4 shadow-lg ${column.color}`}>
      <CardHeader>
        <CardTitle className="capitalize">{column.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
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
