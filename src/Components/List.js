import React from 'react';
import Card from './Card';
import Footer from './Footer';
import Next from './Next';

function App() {
  const [articles, setArticles] = React.useState( [] );

  const getArticles = async () => {
    
    const react = await fetch('https://pywombat.com/api/v1/articles/');
    const articles = await react.json();
    
    console.log(articles);

    setArticles(articles);  
  }

  React.useEffect( () => {
    getArticles();
  }, [] );

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        {articles.map(article => 
          <div className="mt-4">
            <Card {...article} />
          </div>
        )}
      </div>
  
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </>
  );
  
}

export default App;
