// app/routes/api/test.ts
import { json } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json({ message: 'API is working!' });
};