interface DatePickerProps {
    date: string;
    onSelect: (date: string) => void;
}

const DatePicker = ({ date, onSelect }: DatePickerProps) => {
    return (
        <div className="flex flex-col">
            <label className="block text-md font-medium text-gray-700 mb-1">
                Select Date
            </label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => onSelect(e.target.value)}
                className="p-2 border rounded-md"
            />
        </div>
    );
};

export default DatePicker