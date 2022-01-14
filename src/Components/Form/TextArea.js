import React from 'react'

export default function TextArea(props) {

    const { id, label, name, error, onInput, readOnly, initialValue } = props;

    return (
        <div className="mb-4">
            <label className="block mb-1" htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                readOnly={readOnly ?? false}
                className={`py-2 px-3 border border-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${error && 'border-red-500'}`}
                onChange={(e) => onInput(e.target.value)}
            >{initialValue}</textarea>
            {
                error && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {error}
                </span>
            }
        </div>
    )
}
