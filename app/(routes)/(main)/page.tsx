"use client";

import HomePage from "@/components/home-page/home-page";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Home() {
  return (
    <main>
      <ProgressBar height="3px" color="#a00001ff" options={{ showSpinner: false }} shallowRouting />
      <HomePage />
    </main>
  );
}
