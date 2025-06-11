import { ChangeEvent } from 'react';
interface SelectInputProps {
    label: string;
    value: string | null;
    options: { id: number; value: string }[];
    onChange: (value: string) => void;
}

const SelectInput = ({ label, value, options, onChange }: SelectInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                value={value || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-gray-500 bg-white"
            >
                <option value="" disabled>
                    Select {label.toLowerCase()}
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput