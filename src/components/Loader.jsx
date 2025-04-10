import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-slate-700/90 z-50 dark:bg-black/70 dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s] dark:bg-white"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s] dark:bg-white"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce dark:bg-white"></div>
            {/* <div class="w-12 h-12 rounded-full bg-red-500 animate-fold"></div> */}
        </div>

    );
};

export default Loader;

