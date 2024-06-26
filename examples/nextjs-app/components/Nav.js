import React from 'react';
import Link from 'next/link';
import { useEarthoOne } from '@eartho/one-client-react';
import { useRouter } from 'next/router';
import { Loading } from './Loading';

export function Nav() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useEarthoOne();
  const { pathname } = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">@eartho/one-client-react</span>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link
            href="/"
            className={`nav-item nav-link${pathname === '/' ? ' active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/users"
            className={`nav-item nav-link${
              pathname === '/users' ? ' active' : ''
            }`}
          >
            Users
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <span id="hello">Hello, {user.name}!</span>{' '}
          <button
            className="btn btn-outline-secondary"
            id="logout"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          id="login"
          onClick={() => loginWithRedirect()}
        >
          login
        </button>
      )}
    </nav>
  );
}
