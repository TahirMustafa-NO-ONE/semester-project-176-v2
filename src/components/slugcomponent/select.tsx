import { useState } from "react";

interface selcteprops {
    selecttitle: string;
    options: string[];
}

export default function Select({ selecttitle, options }: selcteprops) {
    const [showOptions, setshowoptions] = useState(false);

    return (
        <div className="my-3">
            <button
                type="button"
                className="flex justify-between px-2 md:px-5 lg:px-5 xl:px-5 w-full text-xs md:text-lg lg:text-lg xl:text-lg font-semibold mb-2 py-1 rounded-md text-gray-500 bg-gray-300 focus:outline-none transition"
                onClick={() => setshowoptions((prev) => !prev)}
            >
                
                <div><span>{selecttitle}</span>
                <span className="bg-red-600 text-black mx-2 px-1 rounded-lg">required</span></div>
                <span className="text-gray-700">▼</span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    showOptions ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {showOptions && (
                    <div className="max-h-80 overflow-y-auto flex flex-col hide-scrollbar">
                        {options.map((value) => (
                            <label key={value} className="flex items-center gap-2 cursor-pointer px-4 py-1 text-xs md:text-sm lg:text-sm xl:text-sm">
                                <input
                                    type="radio"
                                    name="flavor"
                                    value={value}
                                    className="accent-orange-500"
                                />
                                <span>{value}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
