import React, { useContext } from "react";
import Image from "next/image";
import { authContext } from "@/lib/store/auth-context";
import { themeContext } from "@/lib/store/theme-context";
import { ImStatsBars } from "react-icons/im";
import Button from "@/components/ui/Button";


function Navigation() {
  const { user, loading, logout } = useContext(authContext);
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <header className="w-full min-w-0 max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* User Info */}

      {user && !loading && (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-elevated border border-border">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName}
                width={40}
                height={40}
                className="object-cover h-full w-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold">
                {user.displayName?.charAt(0) ?? "U"}
              </span>
            )}
          </div>

          {/* name */}
          <small className="text-sm text-gray-200">
            Hi, <span className="font-medium">{user.displayName}!</span>
          </small>
        </div>
      )}



      {/* Right side of the navigation */}
      {user && !loading && (
        <nav className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="min-h-[36px] px-3 rounded-button border border-border text-xs uppercase tracking-wide bg-surface-elevated hover:bg-surface"
            aria-label="Toggle light or dark theme"
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
          <div>
            <a href="#stats" aria-label="Jump to stats">
              <ImStatsBars className="text-2xl" />
            </a>
          </div>
          <div>
            <Button variant="danger" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </nav>
      )}

      </div>
    </header>
  );
}

export default Navigation