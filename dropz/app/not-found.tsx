
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";


const images = [
  "/KittenError.jpeg",
  "/SadKitten.jpg",
  "/cat-red-wine.gif", 
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const Error = () => {
  const randomImage = getRandomImage();

  return ( 
    <main>
        <div className="h-full flex flex-col items-center justify-center space-y-4 mt-40">
        <h1 className="text-5xl font-extrabold">Error 404</h1>
        <Image
            src={randomImage} 
            height="500"
            width="500"
            alt="not-found"
            className="object-contain"
        />
        <h2 className="text-xl font-medium">
            Something went wrong!
        </h2>
        <Button asChild>
            <Link href="/">
            Go back
            </Link>
        </Button>
        </div>
        
    </main>
  );
}

export default Error;
