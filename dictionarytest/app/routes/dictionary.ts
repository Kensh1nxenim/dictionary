import { json } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';
import { loadData } from '../utils/loadData';

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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query')?.toLowerCase() || '';
  const letter = url.searchParams.get('letter')?.toUpperCase() || '';
  const data = loadData();

  let filteredData = data;

  if (letter) {
    filteredData = data.filter((wordData: any) => wordData.word[0].toUpperCase() === letter);
  }

  if (query) {
    const exactMatches = data.filter((wordData: any) => wordData.word.toLowerCase() === query);
    const remainingWords = data.filter((wordData: any) => wordData.word.toLowerCase() !== query);

    const sortedWords = remainingWords.sort((a: any, b: any) => 
      getLevenshteinDistance(a.word.toLowerCase(), query) -
      getLevenshteinDistance(b.word.toLowerCase(), query)
    );

    filteredData = [...exactMatches, ...sortedWords.slice(0, 5)];
  }

  return json(filteredData);
};
