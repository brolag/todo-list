import cx from "classnames";
import { useState } from "react";
import { type TodoListItem } from "~/types";

interface TaskProps {
  task: TodoListItem;
  finishTaskHandler: (id: number) => void;
  deleteTaskHandler: (id: number) => void;
  updateTaskHandler: (id: number, text: string) => void;
}

export default function Task({
  task,
  finishTaskHandler,
  deleteTaskHandler,
  updateTaskHandler,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  return (
    <li className={cx("flex flex-row items-center space-x-2", {
      group: !isEditing,
    })}>
      <input
        onChange={() => {
          finishTaskHandler(Number(task.id));
        }}
        type="checkbox"
        name="done"
        id=""
        checked={task?.done}
      />
      <div
        className={cx("cursor:pointer", {
          "text-gray-600 line-through": task.done,
          "text-black": !task.done,
          hidden: isEditing,
        })}
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        {newText}
      </div>

      <input
        className={cx({
          hidden: !isEditing,
          "border-1 border border-gray-600": isEditing,
          "bg-gray-300": !isEditing,
        })}
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />

      <button
        onClick={() => {
          updateTaskHandler(Number(task.id), newText);
          setIsEditing(!isEditing);
        }}
        className={cx({
          hidden: !isEditing,
        })}
      >
        ✅
      </button>
      <button
        onClick={() => {
          deleteTaskHandler(Number(task.id));
        }}
        className={cx("hidden text-sm group-hover:block", {
          hidden: isEditing,
        })}
      >
        🗑️
      </button>
    </li>
  );
}