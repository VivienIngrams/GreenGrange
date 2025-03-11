import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getInfoSectionsQuery } from '@/sanity/lib/queries';

interface NavInfoSection {
  title: string;
  identifier: string;
}

async function getNavSections(): Promise<NavInfoSection[] | null> {
  return client.fetch(getInfoSectionsQuery);
}

export default async function Header() {
  const navSections = await getNavSections();

  if (!navSections?.length) return null; // If there are no nav sections, return nothing

  return (
    <header className="text-green-800 hidden md:fixed z-20 top-0 left-0 w-full bg-white ">
      <div className=" mx-auto px-4">
        <nav>
          <ul className="flex justify-between items-center py-4 mx-[10vw]">
          <li >
                <Link href='/' className="text-lg">
                 Welcome
                </Link>
              </li>
            {navSections.map((section) => (
              <li key={section.identifier}>
                <Link href={`/${section.identifier}`} className="text-lg">
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
