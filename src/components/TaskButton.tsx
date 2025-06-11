import { useTaskUI } from "@/context/TaskContext"

const AddTaskButton = () => {
    const {
        setEditTask,
        setShowAddModal,
    } = useTaskUI()

    const handleAddTask = () => {
        setShowAddModal(true)
        setEditTask(undefined)
    }
    return (
        <div className="flex column justify-end m-6">
            <button className="bg-black text-white rounded-md shadow-md p-3" onClick={handleAddTask}>+ Add Task</button>
        </div>
    )
}

export default AddTaskButton