import { Maven_Pro } from "next/font/google";
import { useState } from "react";
import Chat from "@/components/chatComponent.jsx";
import Chart from "@/components/chartComponent.jsx";

const mavenPro = Maven_Pro({ subsets: ["latin"] });

export default function Home() {
  const [view, setView] = useState(true)

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 ${mavenPro.className}`}
    >
      <button className="border py-1 px-2 mb-4" onClick={() => setView(!view)}>change view</button>
      {view ? <Chat /> : <Chart />}
    </main>
  );
}
