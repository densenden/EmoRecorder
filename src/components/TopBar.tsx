import { UserButton } from '@clerk/clerk-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
  showUserButton?: boolean;
}

export function TopBar({ title, subtitle, showUserButton = false }: TopBarProps) {
  return (
    <div className="sticky top-0 surface-elevated border-b border-border-elevated-light dark:border-border-elevated-dark z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-16">
          <a href="/" className="flex items-baseline gap-3">
            <img 
              src="/logo.svg" 
              alt="SenRecorder Logo" 
              className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
            />
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg sm:text-xl font-thin text-primary transform scale-80 origin-left">
                {title}
              </h1>
              {subtitle && (
                <span className="text-sm text-secondary">
                  — {subtitle}
                </span>
              )}
            </div>
          </a>
          {showUserButton && (
            <UserButton />
          )}
        </div>
      </div>
    </div>
  )
}