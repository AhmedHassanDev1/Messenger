"use client"
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";
import { SignUpRoute } from "@/constants/router";
export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white home">
      <header className="header p-2 sm:p-4 ">
          <Logo w={40} h={40}/>
      </header>
       <section className="right-section ">
          <h1 className="p-2 sm:text-7xl text-4xl font-bold  bg-clip-text text-transparent bg-cover  bg-gradient-to-b  from-indigo-500  via-purple-500  to-pink-500 ">
            Hang out
           <br/> anytime, <br/> anywhere
          </h1>
          <h3 className=" text-gray-400 text-xl font-medium">Messenger makes it easy and fun to stay close to your favorite people.</h3>
          <button className="  max-w-44  bg-blue-500 p-2 text-white rounded-full">
              <Link className="-w-full h-full"  href={SignUpRoute}>Join Now</Link>
          </button>
       </section>
       <section className="left-section">
           <Image src={"/home.webp"} fill objectFit="contain" quality={100}/>
       </section>
          
    </main>
  );
}

 