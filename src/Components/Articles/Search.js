import React, { useState } from 'react';

function Search( { searchArticles, filterArticles } ){

    const handleInputChange = (e) => {
      searchArticles(e.target.value);
    }

    const handleFilter = (category) => {
      filterArticles(category);
    };

    return (
      <div key="filter" className="max-w-md mx-auto bg-white rounded-xl  md:max-w-2xl">
        <div className="space-x-2 text-center">
          <button 
            onClick={() => handleFilter('beginners')}
            className="py-2 px-4 rounded bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 focus:outline-none">
            Beginners
          </button>
          <button 
            onClick={() => handleFilter('medium')}
            className="py-2 px-4 rounded bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 focus:outline-none">
            Medium
          </button>
          <button 
            onClick={() => handleFilter('advanced')}
            className="py-2 px-4 rounded bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 focus:outline-none">
            Advanced
          </button>
        </div>
        <div className="pt-4 ">
          <input
            type="search"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
          />
        </div>
      </div>

    )
}

export default Search;