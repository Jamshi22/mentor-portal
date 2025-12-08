import React from "react";

const FilterDropdowns = ({ round, year, onChange }) => {
    const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const years = [2023, 2024, 2025];

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {/* Round Dropdown */}
            <div className="flex flex-col">
                <select
                    id="round"
                    name="round"
                    value={round || ""}
                    onChange={(e) =>
                        onChange("round", e.target.value ? Number(e.target.value) : null)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-[#808080]
                    "
                >
                    <option value="">All Rounds</option>
                    {rounds.map((r) => (
                        <option key={r} value={r}>
                            Round {r}
                        </option>
                    ))}
                </select>
            </div>

            {/* Year Dropdown */}
            <div className="flex flex-col">
                <select
                    id="year"
                    name="year"
                    value={year || ""}
                    onChange={(e) =>
                        onChange("year", e.target.value ? Number(e.target.value) : null)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                      text-[#808080]
                    "
                >
                    <option value="">All Years</option>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterDropdowns;
