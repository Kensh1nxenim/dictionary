import Dictionary from '../components/Dictionary';
import React from 'react';
import '../styles/style.css';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';
import { loadData } from './../utils/loadData';

export const loader: LoaderFunction = async () => {
  const data = loadData();
  return json(data);
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Diksyunaryong Filipino</h1>
      <Dictionary data={loaderData} />
    </div>
  );
}
