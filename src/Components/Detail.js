import { useParams } from 'react-router-dom';
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Footer from './Footer';
import { FaBook } from 'react-icons/fa';
import Navbar from './Navbar'; 
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import './python.css';

marked.setOptions({
  highlight: function (code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code; // Fallback if language is not found
  },
});

const renderMarkdown = (markdown) => {
  return { __html: DOMPurify.sanitize(marked(markdown)) };
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Detail() { 
  let { slug } = useParams();
  
  const [loading, setLoading] = React.useState( true );
  const [article, setArticle] = React.useState( {} );

  const getArticle = async () => {
    const response = await fetch(`https://pywombat.com/api/v1/articles/${slug}`);
    const article = await response.json();

    setArticle(article);
    setLoading(false);
  }
  
  React.useEffect(() => {
    Prism.highlightAll(); // Ensure syntax highlighting after component renders
  }, [article]);

  React.useEffect( () => {
    getArticle();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Navbar />

    <div className="flex flex-col items-center max-w-5xl mx-auto my-4 p-4 rounded-lg">
      <img 
        src="https://pywombat.s3.us-east-2.amazonaws.com/background/bg_python.png" 
        alt="Pywomtbat Logo" 
        className="w-4/5 h-auto"
      />
      <div className="text-center mt-4">
        <h1 className="text-5xl font-bold font-sans text-gray-900 mb-4">{article.title}</h1>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="font-semibold">Author: { capitalize( article.author.username ) } </span>
          <span>{ article.created_at }</span>
          <div className="flex items-center space-x-2">
            <span>{article.reading_time} min. read</span>
            <FaBook className="text-xl" />
          </div>
        </div>
        <hr/>
      </div>
    </div>
    
    <div className="container mx-auto px-4 p-10">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="prose lg:prose-xl font-sans bold text-gray-600">
          <p>
            <div
              className="language-js markdown-content prose lg:prose-xl prose-indigo max-w-none"
              dangerouslySetInnerHTML={renderMarkdown(article.markdown_content)}
            ></div>
          </p>
        </div>
      </div>
    </div>
        
    <div className="container mx-auto px-4 py-8">
      <Footer />
    </div>
  </>
  );
}

export default Detail;