import { useParams } from 'react-router-dom';
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Footer from './Footer';

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
            <img src="path/to/featured-image.jpg" alt="Featured Image" className="mx-auto w-full mb-8 rounded-lg max-w-xl"/>
            <h1 className="text-4xl font-bold font-sans text-gray-900 mb-4">{article.title}</h1>
            <div className="text-gray-600 mb-4">
              <span>By Author Name</span>
            </div>
            <div className="text-gray-600 mb-4">
              <span>Level: Medium</span>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
            </div>
          </div>
          
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