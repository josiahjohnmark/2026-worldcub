'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center select-none">
      <h1 className="font-sans text-4xl font-medium tracking-tight text-zinc-300">404</h1>
      <p className="font-mono text-xs tracking-wider uppercase text-zinc-500 mt-2">Page Not Found</p>
      <Link 
        href="/"
        className="mt-6 border border-zinc-800 hover:border-zinc-500 bg-zinc-950/40 rounded-full py-1.5 px-4 text-xs tracking-wider uppercase font-mono text-zinc-400 hover:text-white transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
