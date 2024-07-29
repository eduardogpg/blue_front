import Card from './Card';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Articles/Search';
import React, { useEffect, useState } from 'react';
import { FaBook, FaEye } from 'react-icons/fa';


const ArticleCard = ({ article }) => (
  <div className="flex flex-col items-center w-full max-w-sm mx-auto my-4 p-4 rounded-lg shadow-md">
    <div className="flex-shrink-0">
      <img 
        src={article.image} 
        alt={article.title} 
        className="w-full h-48 object-cover rounded"
      />
    </div>
    <div className="flex flex-col justify-between flex-grow text-center mt-4">
      <div>
        <h1 className="text-2xl font-bold font-sans text-gray-900 mb-2">{article.title}</h1>
        <div className="flex justify-center items-center space-x-2 mb-2">
          <span>12/01/2024</span>
        </div>
        <div className="flex justify-center items-center space-x-2 mb-2">
          <span>10 Vistas - </span>
          <span>Categoria - </span>
          <div className="flex items-center space-x-2">
            <span>{article.reading_time} min.</span>
            <FaBook className="text-xl" />
          </div>
        </div>
      </div>
      <p className="text-gray-700">{article.description}</p>
    </div>
  </div>
);

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

        <div className="flex flex-col items-center max-w-5xl mx-auto my-4 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>

        { next === null ? (
          <div className="text-center text-lg font-semibold mb-8">Estas al día 🐍</div>
        ) : (
          <div className="text-center mb-8">
            <button onClick={ loadMoreData } className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Cargar más</button>
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
