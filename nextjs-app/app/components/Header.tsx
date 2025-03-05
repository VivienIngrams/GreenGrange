export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
       <nav>
          <ul className="flex justify-between items-center py-4">
            <li>
              <a href="/" className="text-lg font-bold">Next.js App</a>
            </li>
            <li>
              <a href="/activites" className="text-lg">Activities</a>
            </li>
            <li>
              <a href="/house" className="text-lg">House</a>
            </li>
          </ul>
       </nav>
      </div>
    </header>
  )
}

