import Link from 'next/link';

export default function Header() {
  return (
    <header className=" text-green-800">
      <div className="container mx-auto px-4">
       <nav>
          <ul className="flex justify-between items-center py-4 mx-[10vw]">
            <li>
              <Link href="/" className="text-lg font-bold">The Green Grange</Link>
            </li>
            <li>
              <Link href="/house" className="text-lg">The House</Link>
            </li>
            <li>
              <Link href="/getting-around" className="text-lg">Getting Around Gyé</Link>
            </li>
            <li>
              <Link href="/activities" className="text-lg">Local Activities</Link>
            </li>
            <li>
              <Link href="/renovation" className="text-lg">Our Renovation Story</Link>
            </li>
          </ul>
       </nav>
      </div>
    </header>
  )
}

