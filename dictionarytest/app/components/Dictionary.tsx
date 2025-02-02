import React, { useState } from 'react';
import Pagination from './Pagination';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import './Dictionary.css';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface DictionaryProps {
  data: WordData[];
}

const Dictionary: React.FC<DictionaryProps> = ({ data }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ exactMatches: WordData[], closestMatches: WordData[] }>({ exactMatches: [], closestMatches: [] });
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageChange = (letter: string) => {
    setCurrentCategory(letter);
    setIsSearching(false);
    const filteredData = data.filter(wordData => wordData.word[0].toUpperCase() === letter.toUpperCase());
    setSearchResults({ exactMatches: filteredData, closestMatches: [] });
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    try {
      const response = await fetch(`/search?query=${query.toLowerCase()}`);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleBack = () => {
    setCurrentCategory(null);
    setIsSearching(false);
    setSearchQuery('');
    setSearchResults({ exactMatches: [], closestMatches: [] });
  };

  return (
    <div>
      {isSearching ? (
        <SearchPage data={searchResults} onBack={handleBack} onSearch={handleSearch} searchQuery={searchQuery} />
      ) : currentCategory ? (
        <CategoryPage letter={currentCategory} data={searchResults.exactMatches} onBack={handleBack} />
      ) : (
        <>
          <Pagination currentPage={currentCategory || 'A'} onPageChange={handlePageChange} />
          <button className="search-button" onClick={() => setIsSearching(true)}>Maghanap sa Diksyunaryo</button>
          <p>Pumili ng titik upang makita ang mga salita o maghanap sa diksyunaryo.</p>
        </>
      )}
    </div>
  );
};

export default Dictionary;
