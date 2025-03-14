import { LockKeyhole } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-muted py-4 mt-8">
      <div className="mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          For booking inquiries, please contact us{" "}
          <a href="" className="text-primary hover:underline">
            
          </a>
        </p>
      </div>
      <div>
        <a href="https://green-grange-studio.vercel.app/structure"
        target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 text-[#d3e6c4] ">
          <LockKeyhole size={24} />
        </a>
      
      </div>
    </footer>
  )
}

