import React from "react";
import { AuthProvider } from "../util/auth";
import ProtectedRoute from "../util/protectedRoute"
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default MyApp;
