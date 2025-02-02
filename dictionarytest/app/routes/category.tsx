import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useParams, useNavigate } from '@remix-run/react';
import CategoryPage from '../components/CategoryPage';
import { loadData } from '../utils/loadData';
import React from 'react';

interface WordData {
  word: string;
  link: string;
  definition: string;
  language: string;
}

interface LoaderData {
  filteredData: WordData[];
  letter: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { letter } = params;
  if (!letter) {
    throw new Response("Not Found", { status: 404 });
  }
  const data = loadData();
  const filteredData = data.filter((wordData: WordData) => wordData.word[0].toUpperCase() === letter.toUpperCase());
  return json({ filteredData, letter });
};

const CategoryRoute = () => {
  const { filteredData, letter } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  return (
    <CategoryPage 
      letter={letter} 
      data={filteredData} 
      onBack={() => navigate(-1)} 
    />
  );
}

export default CategoryRoute;
