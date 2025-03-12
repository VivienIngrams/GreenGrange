'use client'

import Link from 'next/link';
import { useState } from 'react';
import { client } from '@/sanity/lib/client';
import { getInfoSectionsQuery } from '@/sanity/lib/queries';
import { useEffect } from 'react';

interface NavInfoSection {
  title: string;
  identifier: string;
}

async function getNavSections(): Promise<NavInfoSection[] | null> {
  return client.fetch(getInfoSectionsQuery);
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [navSections, setNavSections] = useState<NavInfoSection[] | null>(null);

  useEffect(() => {
    async function fetchNavSections() {
      const sections = await getNavSections();
      setNavSections(sections);
    }
    fetchNavSections();
  }, []);

  if (!navSections?.length) return null; // If there are no nav sections, return nothing

  return (
    <header className="text-yellow-900 fixed z-20 top-0 left-0 w-full bg-white">
      <div className="mx-auto px-4">
        <nav className="flex flex-col  items-center w-full py-4">
         
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-2 right-2 text-yellow-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <Link href="/" className=" mb-1 text-green-800">
              Welcome to the <span className='font-kalnia font-semibold'>Green Grange</span> 
            </Link>
          </div>
          <ul className={`md:flex w-full justify-around text-md md:text-lg ${isOpen ? 'block' : 'hidden'}`}>
          <div className="hidden md:flex items-center">
            <Link href="/" className=" mb-1 text-green-800">
              Welcome to the <span className='font-kalnia font-semibold'>Green Grange</span> 
            </Link>
          </div>
           {navSections.map((section) => (
              <li key={section.identifier} className="md:ml-4 ">
                <Link href={`/${section.identifier}`} className=" text-center block py-2 md:py-0">
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}