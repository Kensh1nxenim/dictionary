import React, { useState, useEffect } from 'react';
import './SearchPage.css';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface SearchPageProps {
  data: { exactMatches: WordData[], closestMatches: WordData[] };
  onBack: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ data, onBack, onSearch, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <button className="back-button" onClick={onBack}>Bumalik sa Diksyunaryo</button>
      <h2>Maghanap sa Diksyunaryo</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Maghanap ng salita..."
        />
        <button type="submit" className="search-button">Maghanap</button>
      </form>
      {searchTerm.trim() !== '' && (
        <div className="results-container">
          <h2>Resulta</h2>
          {data.exactMatches.length > 0 ? (
            <ul>
              {data.exactMatches.map(wordData => (
                <li key={wordData.word}>
                  <a href={wordData.link} target="_blank" rel="noopener noreferrer">
                    {wordData.word}
                  </a> - {wordData.definition} ({wordData.language})
                </li>
              ))}
            </ul>
          ) : (
            <p>Walang nahanap na eksaktong tugma.</p>
          )}
          <h2>Mungkahing mga salita</h2>
          {data.closestMatches.length > 0 ? (
            <ul>
              {data.closestMatches.map(wordData => (
                <li key={wordData.word}>
                  <a href={wordData.link} target="_blank" rel="noopener noreferrer">
                    {wordData.word}
                  </a> - {wordData.definition} ({wordData.language})
                </li>
              ))}
            </ul>
          ) : (
            <p>Walang mungkahi na mga salita.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
