import TaskDashboard from "@/components/ui/Dashboard/TaskDashboard";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  return (
    <div>
      <TaskDashboard params={params} />
    </div>
  );
};

export default page;
