'use client';

import React from "react";
import { TaskBoard } from "@/components/Task/TaskBoard";
import { useTaskUI } from "@/context/TaskContext";
import AddTaskButton from "@/components/TaskButton";
const DeleteModal = React.lazy(() => import('../components/Modals/DeleteModal'));
const AddTaskModal = React.lazy(() => import ('../components/Modals/AddTaskModal'))

export default function Home() {

  const {
    showAddModal,
    showDeleteModal,
  } = useTaskUI()

  return (
    <div className="p-6">
      <AddTaskButton />
      {showAddModal && <AddTaskModal />}
      {showDeleteModal && <DeleteModal />}
      <TaskBoard />
    </div>
  );
}
