'use client';

import React, { createContext, useContext, useState } from "react";
import { FormValues } from "@/components/Modals/AddTaskModal";

type TaskUIContextType = {
  editTask: FormValues | undefined;
  setEditTask: (task: FormValues | undefined) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  taskToDeleteId: string | null;
  setTaskToDeleteId: (id: string | null) => void;
};

const TaskUIContext = createContext<TaskUIContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [editTask, setEditTask] = useState<FormValues | undefined>(undefined);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  return (
    <TaskUIContext.Provider value={{
      editTask,
      setEditTask,
      showAddModal,
      setShowAddModal,
      showDeleteModal,
      setShowDeleteModal,
      taskToDeleteId,
      setTaskToDeleteId
    }}>
      {children}
    </TaskUIContext.Provider>
  );
};

export const useTaskUI = () => {
  const context = useContext(TaskUIContext);
  if (!context) throw new Error("useTaskUI must be used within a TaskUIProvider");
  return context;
};
