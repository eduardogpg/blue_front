import Card from './Card';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Articles/Search';
import React, { useEffect, useState } from 'react';

function App() {
  const ARTICLE_API_URL = `${ process.env.REACT_APP_HOST_API }/articles/?origin=web`;

  const [next, setNext] = useState( null );
  const [articles, setArticles] = useState( [] );
  
  const getArticles = async (endpoint) => {
    try {
      const react = await fetch(endpoint);
      const response = await react.json();

      return response;
    
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const searchArticles = async (query) => {
    const endpoint = `${ ARTICLE_API_URL }&q=${ query }`;
    const response = await getArticles(endpoint);

    setArticles(response.results);
    setNext(response.next);
  }

  const filterArticles = async (category) => {
    const endpoint = `${ ARTICLE_API_URL }&category=${ category }`;
    const response = await getArticles(endpoint);

    setArticles(response.results);
    setNext(response.next);
  }
  
  async function fetchData() {
    const response = await getArticles(ARTICLE_API_URL);
    
    setNext(response.next);
    setArticles([...articles, ...response.results]);
  };

  useEffect( () => {
    fetchData();
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
            <button onClick={ fetchData } className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Load More</button>
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
