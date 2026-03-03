import React from 'react'

import { authContext } from '@/lib/store/auth-context'
import { useContext } from 'react'
import {ImStatsBars} from 'react-icons/im'
import Button from "@/components/ui/Button";


function Navigation() {

  const {user, loading, logout} = useContext(authContext);

  return (
    <header className="w-full min-w-0 max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* User Info */}

      {user && !loading && (
      <div className="flex items-center gap-2 ">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
        {/* img */}
        <img className="object-cover w-full h-full" src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
        </div>

        {/* name */}
        <small>Hi, {user.displayName}!</small>
      </div>

      )}



      {/* Right side of the navigation */}
      {user && !loading && (
      <nav className="flex items-center gap-4">
        <div>
          <a href="#stats" aria-label="Jump to stats">
            <ImStatsBars className='text-2xl'/>
            </a>
            </div>
        <div>
          <Button variant="danger" onClick={logout}>Sign Out</Button>
        </div>
      </nav>

      )}

      </div>
    </header>
  )
}

export default Navigation