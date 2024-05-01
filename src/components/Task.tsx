import { Status, useTaskStore } from "@/lib/store";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Task({
  id,
  title,
  description,
  status,
}: {
  id: string;
  title: string;
  description?: string;
  status: Status;
}) {
  const dragTask = useTaskStore((state) => state.dragTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  let borderColorClass = "";
  if (status === "TODO") {
    borderColorClass = "border-2 border-sky-500";
  } else if (status === "IN_PROGRESS") {
    borderColorClass = "border-2 border-amber-500";
  } else if (status === "DONE") {
    borderColorClass = "border-2 border-emerald-500";
  }

  return (
    <div
      className={`flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900 ${
        status === "TODO"
          ? "border-2 border-sky-500"
          : "border-2 border-amber-500"
      }`}
      onDragStart={() => dragTask(id)}
      draggable
    >
      <div className="p-3 border-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="cursor-pointer p-2 rounded-lg bg-cyan-200-200 hover:bg-cyan-300 border-node"
          onClick={() => removeTask(id)}
        >
          <FaTrashAlt className="text-gray-500 w-6 h-6  text-center hover:text-rose-500" />
        </button>
        <button
          className="cursor-pointer p-2 rounded-lg bg-cyan-200-200 hover:bg-cyan-300 border-node"
          onClick={() => removeTask(id)}
        >
          <FaEdit className="text-gray-500 w-6 h-6  text-center hover:text-rose-500" />
        </button>
      </div>
    </div>
  );
}
