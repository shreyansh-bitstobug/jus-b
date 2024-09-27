"use client";

import HomePage from "@/components/home-page/home-page";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Home() {
  return (
    <main>
      <ProgressBar height="4px" color="#3366FF" options={{ showSpinner: false }} shallowRouting />
      <HomePage />
    </main>
  );
}
