import TaskDashboard from "@/components/ui/Dashboard/TaskDashboard";
import PrivateRoute from "@/providers/PrivateRoute";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  return (
    <div>
      <PrivateRoute>
        <TaskDashboard params={params} />
      </PrivateRoute>
    </div>
  );
};

export default page;
