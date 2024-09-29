"use client";

import HomePage from "@/components/home-page/home-page";
import MainLoader from "@/components/loader/main-loader";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
    setTimeout(() => setOpacity(0), 4000);
  }, []);

  return isLoading ? (
    <MainLoader className={`opacity-[${opacity}] transition-all`} />
  ) : (
    <main>
      <ProgressBar height="4px" color="#3366FF" options={{ showSpinner: false }} shallowRouting />
      <HomePage />
    </main>
  );
}
