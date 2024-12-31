import "@/styles/globals.css";
import { WishProvider } from '../context/WishContext';

export default function App({ Component, pageProps }) {
  return (
    <WishProvider>
      <Component {...pageProps} />
    </WishProvider>
  );
}