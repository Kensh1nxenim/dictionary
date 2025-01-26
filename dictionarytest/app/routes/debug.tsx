import { json } from '@remix-run/node';

export const loader = async () => {
  return json({ message: "Debug route is working" });
};

export default function Debug() {
  return <h1>Debug route is working</h1>;
}