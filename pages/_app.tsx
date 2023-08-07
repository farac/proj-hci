import "@/styles/globals.scss";
import { Roboto_Slab } from "next/font/google";
import type { AppProps } from "next/app";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto_slab.className}>
      <Component {...pageProps} />
    </main>
  );
}
