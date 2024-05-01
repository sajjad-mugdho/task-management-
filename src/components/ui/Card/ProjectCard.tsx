"use client";
import React, { useState } from "react";
import { Card } from "antd";
import {
  EditOutlined,
  ExportOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();

  const { deadline, id, title, description } = project;

  console.log(project);

  const [loading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    console.log("CLICKED");
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Project Deleted successfully");

        window.location.reload();
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const handlePush = async () => {
    console.log("CLICKED");
    router.push(`/dashboard/projects/${id}`);
  };
  return (
    <Card
      title={project.title}
      bordered={false}
      style={{
        maxWidth: 350,
        boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: "#5cdbd3",
      }}
      actions={[
        <EditOutlined
          style={{
            color: "#254000",
          }}
          key="edit"
        />,
        <ExportOutlined
          onClick={() => handlePush()}
          style={{
            color: "#254000",
          }}
          key="ellipsis"
        ></ExportOutlined>,

        <DeleteOutlined
          onClick={() => handleDelete()}
          style={{
            color: "#f5222d",
          }}
          key="ellipsis"
        />,
      ]}
    >
      <p className="capitalize text-base">
        <span className="text-base font-bold">Description:</span>{" "}
        {project.description}
      </p>
      <p className="text-base">
        <span className="text-base font-bold">Deadline:</span>{" "}
        {format(new Date(project.deadline), "MMMM dd, yyyy")}
      </p>
    </Card>
  );
};

export default ProjectCard;
