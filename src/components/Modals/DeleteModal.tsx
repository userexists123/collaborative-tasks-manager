'use client';

import { useTaskUI } from "@/context/TaskContext";
import { deleteTask } from "@/features/tasks/taskSlice";
import { useDispatch } from "react-redux";

const DeleteModal = () => {
    const { taskToDeleteId, setShowDeleteModal, setTaskToDeleteId } = useTaskUI();
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (!taskToDeleteId) return;
        dispatch(deleteTask({ id: taskToDeleteId }));
        setShowDeleteModal(false);
        setTaskToDeleteId(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-11/12 max-w-md text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Are you sure you want to delete this task?
                </h1>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => { setShowDeleteModal(false) }}
                        className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
