import { FaBook, FaEye } from 'react-icons/fa';

function Card( props ) {
  return (
    <div 
      id={props.slug} 
      key={ props.slug } 
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <img 
          className="h-48 w-full object-cover md:h-full md:w-48" 
          src={props.image_path}
          alt="Article Image" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"> 
            { props.category }
          </div>
          <a href={ props.slug } className="cursor-pointer block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            { props.title }
          </a>
          
          <div className="mt-2 text-gray-500 text-base">
            <div className="flex items-center space-x-2">
              <span>Views { props.views }</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{props.reading_time} min. read</span>
              <FaBook  />
            </div>
            <div className="flex items-center space-x-2">
              <span>{ props.created_at }</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card;