import React, { ReactNode } from 'react'
import Link from 'next/link'

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Inter.ViewAI</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout
