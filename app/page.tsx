import dynamic from "next/dynamic";

const HomePage = dynamic(
  () => import("@/components/home-page").then((module) => module.HomePage),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-black text-sm text-neutral-400">
       Loading portfolio...
      </div>
    ),
  },
);

export default function Home() {
  return <HomePage />;
}

