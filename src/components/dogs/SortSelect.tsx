interface SortSelectProps {
    sort: string;
    onChange: (sort: string) => void;
}

export default function SortSelect({ sort, onChange }: SortSelectProps) {
    return (
        <div className="space-y-2 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
                className="mt-1 block w-full pl-2 pr-10 py-2 text-black text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={sort}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="breed:asc">Breed (A-Z)</option>
                <option value="breed:desc">Breed (Z-A)</option>
                <option value="name:asc">Name (A-Z)</option>
                <option value="name:desc">Name (Z-A)</option>
                <option value="age:asc">Age (Youngest)</option>
                <option value="age:desc">Age (Oldest)</option>
            </select>
        </div>
    );
}