import React from 'react';
import Card from './Card';
import Footer from './Footer';

function App() {
  const [articles, setArticles] = React.useState( [] );

  const getArticles = async () => {
    
    const react = await fetch('https://pywombat.com/api/v1/articles/');
    const articles = await react.json();

    setArticles(articles);  
  }

  React.useEffect( () => {
    getArticles();
  }, [] );

  return (
    <>
      { 
        articles.map( article => 
          <div className="mt-4">
            <Card {...article} />  
          </div>
        ) 
      }
      <Footer />
    </>
  );
}

export default App;
