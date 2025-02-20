import { useState, useEffect, useContext } from "react";
import axiosInstance from "../Routes/Axios";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Column } from "@/customComponents/Column";
import type { Task, Column as ColumnType } from "./types";
import { AuthContext } from "@/Auth/AuthContext";
import { toast } from "react-toastify";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do", color: "bg-red-100" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-yellow-100" },
  { id: "DONE", title: "Done", color: "bg-green-100" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser?.email;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks/tasks", {
          params: { userEmail },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [userEmail]);

  const addTask = async () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title.slice(0, 50),
      description: newTask.description?.slice(0, 200),
      status: "TODO",
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await axiosInstance.post("/tasks/tasks", {
        userEmail: userEmail,
        taskId: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      });
      setTasks((prev) => [...prev, response.data.task]);
      setNewTask({ title: "", description: "" });
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  const editTask = async () => {
    if (!editingTask || !editingTask.title.trim()) return;

    try {
      const response = await axiosInstance.put(
        `/tasks/tasks/${editingTask.taskId}`,
        {
          userEmail,
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
        }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.taskId === editingTask.taskId ? response.data.task : task
        )
      );
      setEditingTask(null);
      setOpenDialog(false);
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updated task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axiosInstance.delete(`/tasks/tasks/${id}`, {
        data: { userEmail },
      });
      setTasks((prev) => prev.filter((task) => task.taskId !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    try {
      const response = await axiosInstance.put(`/tasks/tasks/${taskId}`, {
        userEmail,
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((task) => (task.taskId === taskId ? response.data.task : task))
      );
      toast.info("Task status updated");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {userEmail
          ? `${currentUser.displayName}'s ToDoS!`
          : "Welcome to ToDoS!"}
      </h1>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="mb-8">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title (max 50 characters)"
              maxLength={50}
              value={editingTask ? editingTask.title : newTask.title}
              onChange={(e) =>
                editingTask
                  ? setEditingTask({ ...editingTask, title: e.target.value })
                  : setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description (optional, max 200 characters)"
              maxLength={200}
              value={
                editingTask ? editingTask.description : newTask.description
              }
              onChange={(e) =>
                editingTask
                  ? setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  : setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <Button onClick={editingTask ? editTask : addTask}>
              {editingTask ? "Save Changes" : "Add Task"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              deleteTask={deleteTask}
              setEditingTask={setEditingTask}
              setOpenDialog={setOpenDialog}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
