import { useState } from "react";

type SortProps = {
    sortBy: string;
    setSortBy: (value: "Due Date" | "Priority" | "") => void;
};

const Sort = ({ sortBy, setSortBy }: SortProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (value: "Due Date" | "Priority") => {
        setSortBy(sortBy === value ? "" : value);
    };

    const handleReset = () => {
        setSortBy("");
    };

    return (
        <div
            className="relative inline-block p-2 border rounded focus:outline-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-2 font-medium text-gray-500 cursor-pointer min-w-[150px] justify-between">
                <span>Sort By {sortBy && `: ${sortBy}`}</span>
                {sortBy && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                        }}
                        className="text-gray-500 hover:text-red-500 text-sm font-bold"
                    >
                        ×
                    </button>
                )}
            </div>

            {isHovered && (
                <div className="absolute left-0 bottom-full mb-1 w-40 bg-white border border-gray-300 rounded shadow-md z-10">
                    {["Due Date", "Priority"].map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option as "Due Date" | "Priority")}
                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-black hover:text-white"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sort;
