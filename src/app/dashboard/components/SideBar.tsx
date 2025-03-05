import React from 'react'
import Link from 'next/link'

function SideBar() {
  return (
    <div className="flex flex-col border-l">
        <Link href="/products" className="font-sigmar text-lg">Products</Link>
        Hello
    </div>
  )
}

export default SideBar
