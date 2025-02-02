import React, { useEffect, useState } from 'react';
import './CategoryPage.css';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface CategoryPageProps {
  letter: string;
  data: WordData[];
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ letter, data, onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const wordsPerPage = 10;

  const getFilteredWords = () => {
    const uniqueWords = Array.from(new Set(data.map(word => word.word)))
      .map(word => data.find(wordData => wordData?.word === word))
      .filter(wordData => wordData !== undefined) as WordData[];
    return uniqueWords.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredWords = getFilteredWords();
  const totalPages = Math.ceil(data.length / wordsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  return (
    <div>
      <button className="back-button" onClick={onBack}>Bumalik sa Diksyunaryo</button>
      <h2>Mga katagang nagsisimula sa titik "{letter?.toUpperCase()}"</h2>
      {filteredWords.length > 0 ? (
        <div>
          <ul>
            {filteredWords.map(wordData => (
              <li key={wordData?.word}>
                <a href={wordData?.link} target="_blank" rel="noopener noreferrer">
                  {wordData?.word}
                </a> - {wordData?.definition} ({wordData?.language})
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
              Bumalik
            </button>
            <span style={{ margin: '0 10px' }}>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
              Susunod
            </button>
          </div>
        </div>
      ) : (
        <p>Walang kataga ang nahanap sa titik "{letter?.toUpperCase()}".</p>
      )}
    </div>
  );
};

export default CategoryPage;
