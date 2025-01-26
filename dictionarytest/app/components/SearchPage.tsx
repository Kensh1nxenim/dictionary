import React, { useState, useEffect } from 'react';
import './SearchPage.css';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface SearchPageProps {
  data: WordData[];
  onBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ data, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState<WordData[]>([]);
  const [suggestedWords, setSuggestedWords] = useState<WordData[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWords([]);
      setSuggestedWords([]);
      return;
    }

    const exactMatches = data.filter(wordData => wordData.word.toLowerCase() === searchTerm.toLowerCase());
    const remainingWords = data.filter(wordData => wordData.word.toLowerCase() !== searchTerm.toLowerCase());

    setFilteredWords(exactMatches);

    const sortedWords = [...remainingWords].sort((a, b) =>
      getLevenshteinDistance(a.word.toLowerCase(), searchTerm.toLowerCase()) -
      getLevenshteinDistance(b.word.toLowerCase(), searchTerm.toLowerCase())
    );

    setSuggestedWords(sortedWords.slice(0, 5));
  }, [searchTerm, data]);

  const getLevenshteinDistance = (a: string, b: string) => {
    const matrix = [];

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <button className="back-button" onClick={onBack}>Bumalik sa Diksyunaryo</button>
      <h2>Maghanap sa Diksyunaryo</h2>
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Maghanap ng salita..."
      />
      {searchTerm.trim() !== '' && (
        <div className="results-container">
          {filteredWords.length > 0 && (
            <div>
              <h2>Resulta</h2>
              <ul>
                {filteredWords.map(wordData => (
                  <li key={wordData.word}>
                    <a href={wordData.link} target="_blank" rel="noopener noreferrer">
                      {wordData.word}
                    </a> - {wordData.definition} ({wordData.language})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {suggestedWords.length > 0 && (
            <div>
              <h2>Mga mungkahing salita</h2>
              <ul>
                {suggestedWords.map(wordData => (
                  <li key={wordData.word}>
                    <a href={wordData.link} target="_blank" rel="noopener noreferrer">
                      {wordData.word}
                    </a> - {wordData.definition} ({wordData.language})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
