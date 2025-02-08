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

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    setSearchResults({ exactMatches: [], closestMatches: [] });

    setTimeout(() => {
      const exactMatches = data.filter(wordData => wordData.word.toLowerCase() === query.toLowerCase());
      const remainingWords = data.filter(wordData => wordData.word.toLowerCase() !== query.toLowerCase());

      const sortedWords = remainingWords.sort((a, b) => 
        getLevenshteinDistance(a.word.toLowerCase(), query.toLowerCase()) -
        getLevenshteinDistance(b.word.toLowerCase(), query.toLowerCase())
      );

      const closestMatches = sortedWords.filter(wordData => 
        !exactMatches.some(exactMatch => exactMatch.word.toLowerCase() === wordData.word.toLowerCase())
      ).slice(0, 5);

      setSearchResults({ exactMatches, closestMatches });
    }, 0);
  };

  const handleBack = () => {
    setCurrentCategory(null);
    setIsSearching(false);
    setSearchQuery('');
    setSearchResults({ exactMatches: [], closestMatches: [] });
  };

  const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
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
