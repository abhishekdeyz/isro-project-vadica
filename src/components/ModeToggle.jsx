import React from 'react';

export default function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setMode('normal')}
        className={`px-4 py-2 rounded ${mode === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        Normal
      </button>
      <button
        onClick={() => setMode('ai')}
        className={`px-4 py-2 rounded ${mode === 'ai' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
      >
        AI
      </button>
    </div>
  );
}
