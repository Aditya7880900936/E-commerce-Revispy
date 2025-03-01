import React, { useState, useEffect } from "react";
import { getCategories, saveCategory } from "../api/api";
interface InterestCategory {
  id: string;
  name: string;
  selected: boolean;
}

const ITEMS_PER_PAGE = 6;

const InterestsPage: React.FC = () => {
  const [categories, setCategories] = useState<InterestCategory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data.map((category: { _id: string; name: string }) => ({
        id: category._id,
        name: category.name,
        selected: false,
      })));
    };
    fetchCategories();
  }, []);

  const toggleCategory = async (id: string, name: string) => {
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.map(category =>
        category.id === id ? { ...category, selected: !category.selected } : category
      );
  
      const updatedCategory = updatedCategories.find(category => category.id === id);
      if (updatedCategory?.selected) {
        saveCategory(name); // Only save if the category is selected
      }
  
      return updatedCategories;
    });
  };

  // Handle pagination
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    else if (page === "<<") setCurrentPage(1);
    else if (page === "<" && currentPage > 1) setCurrentPage(currentPage - 1);
    else if (page === ">" && currentPage < totalPages) setCurrentPage(currentPage + 1);
    else if (page === ">>") setCurrentPage(totalPages);
  };

  // Dynamic pagination logic
  const generatePages = () => {
    let pages: (number | string)[] = ["<<", "<"];
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, currentPage + 3);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages) {
      pages.push("...");
    }
    pages.push(">", ">>");
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-gray-800">
      <div className="max-w-lg mx-auto my-12 p-8 border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Please mark your interests!</h1>
        <div className='flex justify-center'>
          <p className="text-center text-gray-600 mb-8">We will keep you notified.</p>
          <hr/>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My saved interests!</h2>
          <div className="space-y-4">
            {currentCategories.map((category, index) => (
              <div className="flex items-center" key={category.id || index}>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={category.selected} 
                    onChange={() => toggleCategory(category.id, category.name)}
                  />
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${category.selected ? 'bg-black border-black' : 'border-gray-400 bg-white'}`}>
                    {category.selected && (
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="ml-3">{category.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          {generatePages().map((page, index) => (
            <button
              key={`${page}-${index}`}
              className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestsPage;