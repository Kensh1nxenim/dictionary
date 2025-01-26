import { json } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';
import { loadData } from './../utils/loadData';

export const loader: LoaderFunction = async () => {
  const data = loadData();
  return json(data);
};
