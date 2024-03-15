import Card from './Card';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Articles/Search';
import React, { useEffect, useState } from 'react';

function App() {
  const API_URL = process.env.HOST_API;
  const ARTICLE_API_URL = `${API_URL}/articles/`;

  const [next, setNext] = useState( ARTICLE_API_URL );
  const [articles, setArticles] = useState( [] );
  
  const getArticles = async () => {
    const react = await fetch(next);
    const response = await react.json();

    setNext(response.next);
    setArticles(
      (previous) => [...articles, ...response.results]
    );
  }

  const searchArticles = async (query) => {
    console.log(query);
  }

  const filterArticles = async (category) => {
      console.log(category);
  }

  useEffect( () => {
    getArticles();
  }, [] );

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="py-4">
          <Search 
            searchArticles={ searchArticles } 
            filterArticles={ filterArticles }
          />
        </div>

        <div className="pb-8 ">
          {articles.map(article => 
            <div className="mt-4">
              <Card {...article} />
            </div>
          )}
        </div>

        { next === null ? (
          <div className="text-center text-lg font-semibold mb-8">Estas al día 🐍</div>
        ) : (
          <div className="text-center mb-8">
            <button onClick={getArticles} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Load More</button>
          </div>
        ) }

        <div className="px-4">
          <Footer />
        </div>

      </div>
      
    </>
  );
  
}

export default App;
