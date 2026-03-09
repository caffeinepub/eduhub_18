import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SiCaffeine } from 'react-icons/si';
import ProfileSetupDialog from './ProfileSetupDialog';
import { useGetCallerUserProfile } from '../hooks/useQueries';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const buttonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <GraduationCap className="h-7 w-7 text-amber-600" />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              EduHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium transition-colors hover:text-amber-600 [&.active]:text-amber-600"
            >
              Browse Courses
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-courses"
                className="text-sm font-medium transition-colors hover:text-amber-600 [&.active]:text-amber-600"
              >
                My Courses
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              className="hidden md:inline-flex"
            >
              {buttonText}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container py-4 flex flex-col gap-3">
              <Link
                to="/courses"
                className="text-sm font-medium py-2 transition-colors hover:text-amber-600 [&.active]:text-amber-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Courses
              </Link>
              {isAuthenticated && (
                <Link
                  to="/my-courses"
                  className="text-sm font-medium py-2 transition-colors hover:text-amber-600 [&.active]:text-amber-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Courses
                </Link>
              )}
              <Button onClick={handleAuth} disabled={disabled} variant={isAuthenticated ? 'outline' : 'default'}>
                {buttonText}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>© {new Date().getFullYear()} EduHub. Empowering learners worldwide.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-amber-600">♥</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-amber-600 transition-colors inline-flex items-center gap-1"
              >
                <SiCaffeine className="h-4 w-4" />
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Profile Setup Dialog */}
      {showProfileSetup && <ProfileSetupDialog />}
    </div>
  );
}
