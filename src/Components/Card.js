function Card( props ) {
  return (
    <div key={ props.slug } className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:h-full md:w-48" src="path_to_your_image.jpg" alt="Article Image" />
        </div>
        <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"> { props.title }</div>
        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Category</a>
        <p className="mt-2 text-gray-500">
            { props.slug }
        </p>
          <a href={ props.slug } className="text-indigo-600 hover:text-indigo-900 float-right">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default Card;