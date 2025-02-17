"use client";

import AuthProvider from "@/components/auth-provider";
import HomePage from "@/components/home-page/home-page";
import MainLoader from "@/components/loader/main-loader";
import AppInitializer from "@/hooks/cart";
import { useHomePageStore } from "@/hooks/use-store";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useEffect } from "react";

export default function Home() {
  const { loaderOn, setLoaderOn } = useHomePageStore();

  useEffect(() => {
    setTimeout(() => {
      setLoaderOn(false);
    }, 5000);
  }, []); // eslint-disable-line

  return loaderOn ? (
    <MainLoader />
  ) : (
    <main>
      <AuthProvider>
        <AppInitializer />
        <ProgressBar height="4px" color="#3366FF" options={{ showSpinner: true }} shallowRouting />
        <HomePage />
      </AuthProvider>
    </main>
  );
}
