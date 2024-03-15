import Card from './Card';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Articles/Search';
import React, { useEffect, useState } from 'react';

function App() {
  const REACT_APP_HOST_API = 'https://pywombat.com/api/v1';
  const ARTICLE_API_URL = `${ REACT_APP_HOST_API }/articles/`;

  const [next, setNext] = useState( null );
  const [query, setQuery] = useState( '' );
  const [category, setCategory] = useState( '' );
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

  const updateArticles = async (newQuery = query, newCategory = category) => {
    if (newQuery !== query) setQuery(newQuery);
    if (newCategory !== category) setCategory(newCategory);
  
    fetchData(`${ARTICLE_API_URL}?q=${newQuery}&category=${newCategory}`);
  }

  const searchArticles = async (query) => {
    updateArticles(query);
  }

  const filterArticles = async (category) => {
    updateArticles(undefined, category);
  }
  
  async function loadMoreData() {
    const response = await getArticles( next );
    
    setArticles(currentArticles => [...currentArticles, ...response.results]);
    setNext( response.next );
  }

  async function fetchData(endpoint) {
    const response = await getArticles( endpoint );
    
    setArticles( response.results );
    setNext( response.next );
  };

  useEffect( () => {
    fetchData(ARTICLE_API_URL);
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
          {articles.map((article, index) => 
            <div key={article.id || index} className="mt-4">
              <Card {...article} />
            </div>
          )}
        </div>

        { next === null ? (
          <div className="text-center text-lg font-semibold mb-8">Estas al día 🐍</div>
        ) : (
          <div className="text-center mb-8">
            <button onClick={ loadMoreData } className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Load More</button>
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
