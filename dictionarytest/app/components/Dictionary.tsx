import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import CategoryPage from './CategoryPage';
import SearchPage from './SearchPage';
import './Dictionary.css';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface DictionaryProps {
  data: WordData[]
}

const Dictionary: React.FC<DictionaryProps> = ({data}) => {
  // const [words, setWords] = useState<WordData[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   // Fetch data from the API endpoint
  //   fetch('/api/dictionary')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error('Error fetching dictionary data:', error));
  // }, []);

  const handlePageChange = (letter: string) => {
    setCurrentCategory(letter);
    setIsSearching(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentCategory(null);
  };

  const handleBack = () => {
    setCurrentCategory(null);
    setIsSearching(false);
  };

  return (
    <div>
      {isSearching ? (
        <SearchPage data={data} onBack={handleBack} />
      ) : currentCategory ? (
        <CategoryPage letter={currentCategory} data={data} onBack={handleBack} />
      ) : (
        <>
          <Pagination currentPage={currentCategory || 'A'} onPageChange={handlePageChange} />
          <button className="search-button" onClick={handleSearch}>Maghanap sa Diksyunaryo</button>
          <p>Pumili ng titik upang makita ang mga salita o maghanap sa diksyunaryo.</p>
        </>
      )}
    </div>
  );
};

export default Dictionary;
