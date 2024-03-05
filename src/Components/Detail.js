import { useParams } from 'react-router-dom';
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Footer from './Footer';
import { FaBook, FaEye } from 'react-icons/fa';
import Navbar from './Navbar'; 

function Detail() { 
    let { slug } = useParams();
    
    const [loading, setLoading] = React.useState( true );
    const [article, setArticle] = React.useState( {} );

    const renderMarkdown = (markdown) => {
      return { __html: DOMPurify.sanitize(marked(markdown)) };
    };

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getArticle = async () => {
      const response = await fetch(`https://pywombat.com/api/v1/articles/${slug}`);
      const article = await response.json();

      setArticle(article);
      setLoading(false);
    }

    React.useEffect( () => {
      getArticle();
    }, [])

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 p-10">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-8">
              {/* <img src={article.image_path}
                alt="Image description" 
                className="mx-auto w-full mb-8 rounded-lg max-w-xl"
              /> */}
              <h1 className="text-5xl font-bold font-sans text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex justify-center items-center space-x-4 mb-4">
                <span className="font-semibold">By: { capitalize( article.author.username ) } </span>
                <span>{ article.created_at }</span>
                <div className="flex items-center space-x-2">
                  <span>{article.reading_time} min. read</span>
                  <FaBook className="text-xl" />
                </div>
              </div>

            </div>
            <hr/>
            <div className="prose lg:prose-xl font-sans bold text-gray-600">
              <p>
                <div 
                  className="prose lg:prose-xl prose-indigo max-w-none"
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