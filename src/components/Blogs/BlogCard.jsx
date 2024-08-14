import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ image, date, title, description, author }) => {
  return (
    <Link
      to={`/blogs/${title}`}
      onClick={() => {
        window.scrollTo(0, 0);
        // window.scroll({
        //   top: 0,
        //   left: 0,
        //   behavior: "smooth",
        // });
      }}
      state={{ image, date, title, description, author }}
      className="block"
    >
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <p>{date}</p>
            <p className="truncate">By {author}</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white truncate">{title}</h1>
            <p className="text-gray-700 dark:text-gray-300 truncate">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
