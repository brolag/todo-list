
import type { TodoListItem } from "~/types/index";
import { useState } from "react";

interface NewTaskFormProps {
  crateNewTask: ({ text }: TodoListItem) => void;
}

export default function NewTaskItemForm({ crateNewTask }: NewTaskFormProps) {
  const [newText, setNewText] = useState("");

  const handleSubmit = () => {
    crateNewTask({ text: newText });
    setNewText("");
  };

  return (
    <div className="flex space-x-2 items-center">
      <label className="text-2xl font-bold" htmlFor="newTodo">Add a task:</label>
      <input
        value={newText}
        name="text"
        className="border-1 border border-gray-200 rounded-md px-2 py-1 w-96"
        type="text"
        onChange={(e) => setNewText(e.target.value)}
      />
      <button
        disabled={!newText}
        onClick={handleSubmit}
        className={`${!newText ? "bg-gray-300" : "bg-blue-800"} rounded-lg py-1  px-4 text-white`}
      >
        Add +
      </button>
    </div>
  );
}