import React from 'react';

const NotFound = () => {
    return (
        <section className='flex justify-center items-center h-96'>
            <div className='text-center'>
                <span className='flex justify-center text-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <h2 className='text-7xl text-gray-400'>404</h2>
                <h1 className='text-4xl text-gray-400'>Result not found...</h1>
            </div>
        </section>
    );
};

export default NotFound;