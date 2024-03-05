import { useParams } from 'react-router-dom';
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Footer from './Footer';
import { FaBook, FaEye } from 'react-icons/fa';


function Detail() { 
    let { slug } = useParams();
    
    const [loading, setLoading] = React.useState( true );
    const [article, setArticle] = React.useState( {} );

    const renderMarkdown = (markdown) => {
      return { __html: DOMPurify.sanitize(marked(markdown)) };
    };

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
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-8">
            <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1689748656351/fa950764-6dc1-4e30-9d14-051aeb707eb0.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
              alt="Featured Image" 
              className="mx-auto w-full mb-8 rounded-lg max-w-xl"
            />
            <h1 className="text-5xl font-bold font-sans text-gray-900 mb-4">{article.title}</h1>
            
            <div className="flex justify-center items-center space-x-4 mb-4">
              <span className="font-semibold">By: Eduardo Ismael </span>
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
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
        <Footer />
      </div>
    );
}

export default Detail;