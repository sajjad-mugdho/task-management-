import { Status, useTaskStore } from "@/lib/store";

import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";

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

  console.log(status);

  return (
    <div
      className={`flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900 ${
        status === "TODO"
          ? "bg-cyan-300"
          : status === "IN_PROGRESS"
          ? "bg-amber-300"
          : "bg-rose-300"
      } 
      `}
      onDragStart={() => dragTask(id)}
      draggable
    >
      <div className="p-3 border-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="cursor-pointer p-2 rounded-lg bg-cyan-200-200 hover:bg-white border-node"
          onClick={() => removeTask(id)}
        >
          <FaTrashAlt className="text-gray-500 w-4 h-4 text-center hover:text-rose-500" />
        </button>
        <button className="cursor-pointer p-2 rounded-lg bg-cyan-200-200 hover:bg-white border-node">
          <FaEdit className="text-gray-500 w-4 h-4  text-center hover:text-rose-500" />
        </button>
        <button className="cursor-pointer p-2 rounded-lg bg-cyan-200-200 hover:bg-white border-node">
          <FaCheck className="text-gray-500 w-4 h-4  text-center hover:text-green-500" />
        </button>
      </div>
    </div>
  );
}
