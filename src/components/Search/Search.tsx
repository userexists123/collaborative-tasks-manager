type searchProps = {
    keyWord?: string
    searchTerm: string;
    classProp?: string;
    setSearchTerm: (value: string) => void
}

const Search = ({ keyWord, searchTerm, classProp, setSearchTerm }: searchProps) => {
    return (
        <div className="flex flex-col">
            <input
                type="text"
                placeholder={`Search by ${keyWord ? keyWord : 'Title'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`p-2 border rounded w-full text-gray-600 focus:outline-none ${classProp ? classProp : ''}`}
            />
        </div>
    );
};


export default Search