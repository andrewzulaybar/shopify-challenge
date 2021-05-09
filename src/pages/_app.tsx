import { MoviesProvider } from '../contexts/MoviesContext';

import 'tailwindcss/tailwind.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <MoviesProvider>
      <Component {...pageProps} />
    </MoviesProvider>
  );
}

export default MyApp;
