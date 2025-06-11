import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "@/features/tasks/taskSlice";
import { RootState } from "@/store/store";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from "react";
import { useDebounce } from "../../hooks/Debounce";
import TaskCard from "./TaskCard";
import Filter from "../FilterComponents/Filter";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";

export const TaskBoard = () => {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const dispatch = useDispatch();
    const [priorityFilter, setPriorityFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"Due Date" | "Priority" | "">("");

    let filteredTasks = tasks

    if (priorityFilter !== "All") {
        filteredTasks = tasks.filter(task => task.priority === priorityFilter);
    }

    if (statusFilter !== "All") {
        filteredTasks = tasks.filter(task => task.status === statusFilter);
    }

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const searchedTasks = debouncedSearchTerm.trim()
        ? filteredTasks.filter(task =>
            task.name!.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredTasks;

    const sortedTasks = [...searchedTasks];

    if (sortBy === "Due Date") {
        sortedTasks.sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : Infinity;
            const dateB = b.date ? new Date(b.date).getTime() : Infinity;
            return dateA - dateB;
        });
    } else if (sortBy === "Priority") {
        const priorityOrder: Record<string, number> = {
            High: 1,
            Medium: 2,
            Low: 3,
        };
        sortedTasks.sort(
            (a, b) =>
                (priorityOrder[a.priority ?? "Low"]) -
                (priorityOrder[b.priority ?? "Low"])
        );
    }

    const columns = [
        { id: "To Do", title: "To Do" },
        { id: "In Progress", title: "In Progress" },
        { id: "Completed", title: "Completed" },
    ];

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        dispatch(updateTaskStatus({ id: draggableId, status: destination.droppableId }));
    };

    return (
        <>
            <div className="px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Filter
                            priorityFilter={priorityFilter}
                            setPriorityFilter={setPriorityFilter}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />
                    </div>
                    <Sort sortBy={sortBy} setSortBy={setSortBy} />

                <div className="w-full md:w-2/4">
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="p-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {columns.map((column) => {
                        const columnTasks = sortedTasks.filter(task => task.status === column.id);
                        return (
                            <Droppable key={column.id} droppableId={column.id}>
                                {(provided) => (
                                    <section
                                        className="bg-gray-50 rounded-lg p-4 shadow-md"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">{column.title}</h2>
                                        {columnTasks.length === 0 && <p className="text-gray-500">No tasks</p>}
                                        {columnTasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id!} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <TaskCard task={task} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </section>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>
        </>
    );
};
