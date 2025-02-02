import React from 'react';

interface PaginationProps {
  currentPage: string;
  onPageChange: (letter: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <div>
      <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none', padding: 0 }}>
        {letters.map(letter => (
          <li
            key={letter}
            style={{
              margin: '0 5px',
              cursor: 'pointer',
              fontWeight: letter.toUpperCase() === currentPage.toUpperCase() ? 'bold' : 'normal',
              color: letter.toUpperCase() === currentPage.toUpperCase() ? 'blue' : 'black'
            }}
            onClick={() => onPageChange(letter)}
          >
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
