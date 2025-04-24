"use client"
import { SessionProvider, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Children, useEffect } from "react";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${small ? "blur-[32px]" : "blur-[75px]"
        } ${conic ? "bg-glow-conic" : ""} ${className ?? ""}`}
    />
  );
}

const LINKS = [
  {
    title: "Docs",
    href: "https://turborepo.com/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turborepo.com/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turborepo.com/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page({children}:{
  children: React.ReactNode
}){
  return(
    <SessionProvider>
    <RealPage/>
  </SessionProvider>
  );
}

function RealPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(()=>{
    if (session.status == "authenticated") {
      router.push("/contests");
    }
  },[session.status]);
  
  // useEffect(() => {
  //   console.log(session);
  //   if (session.status = "authenticated") {
  //     router.push("/home");
  //   }
  // }, [])


  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to CodeArena</h1>
        <p className="text-lg max-w-2xl mb-10 text-gray-600">
          CodeArena is your competitive edge in algorithm mastery. Weekly contests, rich problem sets, real-time rankings, and detailed solutions — all crafted for coders who want to win.
        </p>
        <div className="flex gap-6">
          <button onClick={()=>{router.push("/signup")}} className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition">
            Sign Up
          </button>
          <button onClick={() => { signIn("credentials", { callbackUrl: "/contests" }); }} className="border border-gray-400 px-8 py-3 rounded-full text-lg font-medium hover:border-blue-500 hover:text-blue-600 transition">
            Log In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Join CodeArena?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Curated Contests</h3>
              <p className="text-gray-600">
                Participate in weekly challenges designed to push your limits and sharpen your skills.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Detailed Explanations</h3>
              <p className="text-gray-600">
                Learn from model solutions and explanations that improve your understanding after each contest.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Live Leaderboards</h3>
              <p className="text-gray-600">
                Compete with others in real-time and see where you stand instantly with dynamic leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to enter the Arena?</h2>
        <p className="text-gray-600 mb-6">Sign up and become a part of a global coding community.</p>
        <button className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition">
          Get Started
        </button>
      </footer>
    </div>
  );
}
