export const Typography = {
    H1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-semibold font-kalnia tracking-tighter mt-12 mb-6">
        {children}
      </h1>
    ),
    H2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-medium text-black tracking-tight mb-6">
        {children}
      </h2>
    ),
    H3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold font-kalnia tracking-tight mt-8 mb-2">
        {children}
      </h3>
    ),
    Paragraph: ({ children }: { children: React.ReactNode }) => (
      <p className="text-lg leading-relaxed text-gray-900">{children}</p>
    ),
    Blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic text-lg text-gray-700">
        {children}
      </blockquote>
    ),
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href} className="underline text-blue-900 hover:text-blue-800">
        {children}
      </a>
    ),
  };
  