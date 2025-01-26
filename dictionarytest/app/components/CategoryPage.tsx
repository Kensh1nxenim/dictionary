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
  const [filteredWords, setFilteredWords] = useState<WordData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const wordsPerPage = 10;

  useEffect(() => {
    if (letter) {
      const categorizedWords = data
        .filter(wordData => wordData.word[0].toUpperCase() === letter.toUpperCase())
        .filter((wordData, index, self) => self.findIndex(w => w.word === wordData.word) === index); // Remove duplicates

      setFilteredWords(categorizedWords.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage));
    }
  }, [letter, data, currentPage]);

  const handleWordPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = letter ? Math.ceil(data.filter(wordData => wordData.word[0].toUpperCase() === letter.toUpperCase()).length / wordsPerPage) : 0;

  return (
    <div>
      <button className="back-button" onClick={onBack}>Bumalik sa Diksyunaryo</button>
      <h2>Mga katagang nagsisimula sa titik "{letter?.toUpperCase()}"</h2>
      {filteredWords.length > 0 ? (
        <div>
          <ul>
            {filteredWords.map(wordData => (
              <li key={wordData.word}>
                <a href={wordData.link} target="_blank" rel="noopener noreferrer">
                  {wordData.word}
                </a> - {wordData.definition} ({wordData.language})
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => handleWordPageChange(currentPage - 1)} disabled={currentPage === 0}>
              Bumalik
            </button>
            <span style={{ margin: '0 10px' }}>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => handleWordPageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
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
