import React, { useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { loadScripts } from "@/components/ScriptLoader";
import { Toaster } from "react-hot-toast";
import Maintenance from "@/components/Maintenance";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadScripts();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Maintenance session={pageProps.session}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 7000
          }}
        />
        <Component {...pageProps} />
      </Maintenance>
    </SessionProvider>
  );
}

export default MyApp;