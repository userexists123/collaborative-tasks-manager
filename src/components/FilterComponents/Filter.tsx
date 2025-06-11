type FilterProps = {
    priorityFilter: string;
    setPriorityFilter: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
};

const Filter = ({
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
}: FilterProps) => {
    const priorityOptions = ["High", "Medium", "Low"];
    const statusOptions = ["To Do", "In Progress", "Completed"];

    const handlePriorityClick = (option: string) => {
        setPriorityFilter(priorityFilter === option ? "All" : option);
    };

    const handleStatusClick = (option: string) => {
        setStatusFilter(statusFilter === option ? "All" : option);
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div>
                <h3 className="text-gray-600 font-semibold mb-2">Priority</h3>
                <div className="flex flex-wrap gap-2">
                    {priorityOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handlePriorityClick(option)}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                                priorityFilter === option
                                    ? "bg-black text-white border-gray-400"
                                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-gray-600 font-semibold mb-2">Status</h3>
                <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleStatusClick(option)}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                                statusFilter === option
                                    ? "bg-black text-white border-gray-400"
                                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;
