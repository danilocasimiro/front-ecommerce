import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { loadScripts } from "@/components/scriptLoader";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadScripts()
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;