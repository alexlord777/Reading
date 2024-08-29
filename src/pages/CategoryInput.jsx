import React, { useState } from 'react';

const CategoryInput =  ({ category, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-white text-lg mb-2">{category}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(category, e.target.value)}
                className="text-black w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default CategoryInput;
