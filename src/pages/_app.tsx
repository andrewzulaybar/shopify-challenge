import Link from 'next/link';

import { MoviesProvider } from '../contexts/MoviesContext';

import 'tailwindcss/tailwind.css';
import '../index.css';

function MyApp({ Component, pageProps }) {
  return (
    <MoviesProvider>
      <div className="flex flex-col flex-grow font-sans">
        <section className="flex p-8 justify-between align-middle">
          <span className="flex-initial">
            <h2 className="font-bold text-3xl text-gray-700">The Shoppies</h2>
          </span>
          <span className="justify-end pt-2">
            <Link href="/">
              <span className="border-b-2 border-transparent mr-4 hover:border-gray-200">
                <a className="text-base tracking-wider uppercase">Search</a>
              </span>
            </Link>
            <Link href="/nominations">
              <span className="border-b-2 border-transparent ml-4 hover:border-gray-200">
                <a className="text-base tracking-wider uppercase">
                  Nominations
                </a>
              </span>
            </Link>
          </span>
        </section>
        <Component {...pageProps} />
      </div>
    </MoviesProvider>
  );
}

export default MyApp;
