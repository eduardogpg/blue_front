import React from 'react';
import Card from './Card';
import Footer from './Footer';
import Navbar from './Navbar';

function App() {
  const [next, setNext] = React.useState( 'https://pywombat.com/api/v1/articles/' );
  const [articles, setArticles] = React.useState( [] );
  
  const getArticles = async () => {
    const react = await fetch(next);
    const response = await react.json();

    setNext(response.next);
    setArticles(
      () => [...articles, ...response.results]
    );
  }

  function showMore() {
    if (next === null) {
      return <div className="text-center text-lg font-semibold mb-8">Estas al día 🐍</div>
    }

    return (
      <div className="text-center mb-8">
        <button onClick={getArticles} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Load More</button>
      </div>
    );
  }

  React.useEffect( () => {
    getArticles();
  }, [] );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        {articles.map(article => 
          <div className="mt-4">
            <Card {...article} />
          </div>
        )}
      </div>

      { showMore() }

      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </>
  );
  
}

export default App;
