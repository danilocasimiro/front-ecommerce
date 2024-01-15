import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { loadScripts } from "@/components/scriptLoader";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadScripts()
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;