import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type TodoListItem } from "~/types";

import NewTodoItemForm from "./NewTaskForm";
import Task from "./Task";

export default function TodoList() {

  const { data: allTasks } = api.todoList.listAllTask.useQuery();
  const { mutate: addTask } = api.todoList.createTask.useMutation();
  const { mutate: finishTask } = api.todoList.finishTask.useMutation({
    onSuccess: () => api.useUtils().invalidate(),
  });
  const { mutate: updateTask } = api.todoList.updateTask.useMutation({
    onSuccess: () => api.useUtils().invalidate(),
  });
  const { mutate: deleteTask } = api.todoList.deleteTask.useMutation({
    onSuccess: () => api.useUtils().invalidate(),
  });

  const [tasks, setTasks] = useState<TodoListItem[]>([]);

  useEffect(() => {
    if (allTasks) {
      setTasks(allTasks);
    }
  }, [allTasks]);

  const crateNewTask = (newTask: TodoListItem) => {
    setTasks([...tasks, newTask]);
    addTask(newTask);
  };

  const finishTaskHandler = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.done = true;
      setTasks([...tasks]);
      finishTask(id);
    }
  };

  const deleteTaskHandler = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    deleteTask(id);
  };

  const updateTaskHandler = (id: number, text: string) => {
    const newTask = tasks.find((task) => task.id === id);
    if (newTask) {
      newTask.text = text;
      setTasks([...tasks]);
      updateTask({ id, text });
    }
  };

  return (
    <>
      <NewTodoItemForm crateNewTask={crateNewTask} />
      <div>
        <ul className="list-disc">
          {tasks?.map((task: TodoListItem) => (
            <Task
              finishTaskHandler={finishTaskHandler}
              deleteTaskHandler={deleteTaskHandler}
              updateTaskHandler={updateTaskHandler}
              key={Number(task.id)}
              task={task}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
