import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { useTaskUI } from "@/context/TaskContext";
import { updateTaskStatus } from "@/features/tasks/taskSlice";

const TaskCard = ({
    task,
}: {
    task: any;
}) => {
    const { setEditTask, setShowAddModal, setShowDeleteModal, setTaskToDeleteId } = useTaskUI();
    const dispatch = useDispatch();
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateTaskStatus({ id: task.id, status: e.target.value }));
    };
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300 mb-4 relative">

            <div className="absolute top-3 right-3 flex gap-2">
                <button
                    className="text-sm text-black hover:underline"
                    onClick={() => {
                        setEditTask(task);
                        setShowAddModal(true);
                    }}
                >
                    <Pencil size={18} />
                </button>
                <button
                    className="text-sm text-black hover:underline"
                    onClick={() => {
                        setTaskToDeleteId(task.id);
                        setShowDeleteModal(true);
                    }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{task.name}</h2>
            <p className="text-gray-600 mb-1">
                <span className="font-medium">Description:</span> {task.description}
            </p>
            <p className="text-gray-600 mb-1">
                <span className="font-medium">Assignee:</span> {task.assignee}
            </p>
            <p className="text-gray-600 mb-1">
                <span className="font-medium">Due Date:</span> {task.date}
            </p>
            <p className="text-gray-600 mb-1">
                <span className="font-medium">Priority:</span> {task.priority}
            </p>
            <div className="text-gray-600">
                <span className="font-medium">Status: </span>
                <select
                    className="border border-gray-300 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-0"
                    value={task.status}
                    onChange={handleStatusChange}
                >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>
        </div>
    );
};

export default TaskCard