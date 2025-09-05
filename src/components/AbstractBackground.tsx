export function AbstractBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light mode background - clean base */}
      <div className="absolute inset-0 bg-brand-cream dark:hidden"></div>

      {/* Dark mode background - clean base */}
      <div className="absolute inset-0 bg-brand-primary hidden dark:block"></div>

      {/* Abstract elements - positioned to appear behind UI containers only */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light mode abstract shapes */}
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-64 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary to-purple-900 rounded-full transform -skew-x-12 blur-2xl"></div>
            <div className="absolute top-4 left-8 w-48 h-32 bg-gradient-to-r from-brand-primary to-purple-700 rounded-full transform rotate-12 blur-xl"></div>
          </div>
          
          <div className="absolute top-1/3 right-1/5 w-80 h-56 opacity-25">
            <div className="absolute inset-0 bg-gradient-to-bl from-brand-coral via-brand-coral to-brand-red rounded-full transform skew-y-6 blur-2xl"></div>
            <div className="absolute top-8 right-12 w-40 h-28 bg-gradient-to-l from-brand-coral to-brand-red rounded-full transform -rotate-45 blur-xl"></div>
          </div>

          <div className="absolute bottom-1/4 left-1/3 w-72 h-48 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-rose via-brand-coral to-brand-primary rounded-full transform skew-x-12 blur-2xl"></div>
          </div>
        </div>

        {/* Dark mode abstract shapes */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute top-1/4 left-1/4 w-96 h-64 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/40 via-brand-cream/30 to-brand-cream/20 rounded-full transform -skew-x-12 blur-2xl"></div>
            <div className="absolute top-4 left-8 w-48 h-32 bg-gradient-to-r from-brand-cream/35 to-brand-cream/25 rounded-full transform rotate-12 blur-xl"></div>
          </div>
          
          <div className="absolute top-1/3 right-1/5 w-80 h-56 opacity-35">
            <div className="absolute inset-0 bg-gradient-to-bl from-brand-coral/40 via-brand-coral/30 to-brand-red/40 rounded-full transform skew-y-6 blur-2xl"></div>
            <div className="absolute top-8 right-12 w-40 h-28 bg-gradient-to-l from-brand-coral/35 to-brand-red/35 rounded-full transform -rotate-45 blur-xl"></div>
          </div>

          <div className="absolute bottom-1/4 left-1/3 w-72 h-48 opacity-25">
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-rose/30 via-brand-coral/25 to-brand-cream/20 rounded-full transform skew-x-12 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}