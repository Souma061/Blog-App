import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../store/themeSlice';
import { Container, Logo, LogoutBtn } from '../index';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  const handleNavigate = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const renderThemeToggle = (variant = 'desktop') => {
    const isMobile = variant === 'mobile';
    return (
      <button
        type="button"
        onClick={() => {
          handleThemeToggle();
          if (isMobile) {
            setIsMenuOpen(false);
          }
        }}
        className={
          isMobile
            ? 'flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'group relative flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white'
        }
        aria-label="Toggle dark mode"
      >
        {!isMobile && (
          <span className="absolute inset-0 -z-10 scale-95 rounded-xl bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-200 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900" />
        )}
        <span className="flex items-center gap-2">
          {themeMode === 'dark' ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 17a7 7 0 009-4.21z" />
              </svg>
              <span className={isMobile ? 'text-sm font-medium' : 'hidden sm:inline'}>
                {isMobile ? 'Light mode' : 'Light'}
              </span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m3.536.464l-1.414 1.414M21 12h-2m-.464 3.536l-1.414-1.414M12 19v2m-3.536-.464l1.414-1.414M5 12H3m.464-3.536l1.414 1.414"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className={isMobile ? 'text-sm font-medium' : 'hidden sm:inline'}>
                {isMobile ? 'Dark mode' : 'Dark'}
              </span>
            </>
          )}
        </span>
      </button>
    );
  };

  const renderDesktopNavigation = () => (
    <ul className="hidden items-center gap-1.5 text-sm text-slate-600 dark:text-slate-200 lg:flex">
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => handleNavigate(item.slug)}
              className="group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              <span className="absolute inset-0 -z-10 scale-95 rounded-xl bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:from-slate-700/60 dark:via-purple-800/50 dark:to-purple-900/40" />
              {item.name}
            </button>
          </li>
        ) : null,
      )}
      <li key="theme-toggle-desktop">{renderThemeToggle('desktop')}</li>
      {authStatus && (
        <li key="logout" className="pl-1">
          <LogoutBtn />
        </li>
      )}
    </ul>
  );

  const renderMobileNavigation = () => (
    <div
      id="mobile-navigation"
      className={`lg:hidden ${
        isMenuOpen
          ? 'mt-3 translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0'
      } transition-all duration-200`}
      aria-hidden={!isMenuOpen}
    >
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg shadow-sky-100/40 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-900/40">
        <ul className="flex flex-col gap-1.5 text-sm text-slate-700 dark:text-slate-200">
          {navItems.map((item) =>
            item.active ? (
              <li key={`mobile-${item.name}`}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.slug)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left font-medium transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span>{item.name}</span>
                  <svg
                    className="h-4 w-4 text-slate-400 dark:text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ) : null,
          )}
          <li key="theme-toggle-mobile">{renderThemeToggle('mobile')}</li>
          {authStatus && (
            <li key="mobile-logout" className="pt-1">
              <LogoutBtn className="w-full justify-center" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 blur-3xl h-[140px] dark:from-slate-800/40 dark:via-transparent dark:to-purple-800/30" />
        <Container>
          <nav className="relative flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/85 px-4 py-3 shadow-lg shadow-sky-100/40 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-slate-900/40 sm:px-6">
            <Link
              to="/"
              className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo width="56px" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900 lg:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              {renderDesktopNavigation()}
            </div>
          </nav>
          {renderMobileNavigation()}
        </Container>
      </div>
    </header>
  );
}

export default Header;
