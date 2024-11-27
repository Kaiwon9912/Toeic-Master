import React from 'react';

function ExamFilter({ levels, parts, onFilterChange, selectedLevel, selectedParts }) {
  return (
    <div className="p-5 bg-blue-50 rounded-lg shadow-md mb-6 h-[75vh]">
      <h3 className="font-bold text-lg text-blue-700 mb-4">Bộ Lọc</h3>
      
      {/* Lọc theo Level */}
      <div className="mb-4">
        <label className="block font-bold text-blue-600 mb-2">Chọn Level:</label>
        <select
          className="w-full p-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-200"
          value={selectedLevel}
          onChange={(e) => onFilterChange('level', e.target.value)}
        >
          <option value="">Tất cả</option>
          {levels.map((level, index) => (
            <option key={index} value={level}>
              Level {level}
            </option>
          ))}
        </select>
      </div>
      
      {/* Lọc theo Part */}
      <div>
        <label className="block font-bold text-blue-600 mb-2">Chọn Part:</label>
        <div className="grid grid-cols-2 gap-2">
          {parts.map((part) => (
            <label key={part} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={selectedParts.includes(part)}
                onChange={() => onFilterChange('part', part)}
              />
              <span>Part {part}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamFilter;
