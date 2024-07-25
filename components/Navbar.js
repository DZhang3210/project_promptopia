"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Navbar = () => {
  const {data:session} = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(()=>{
    (async () =>{
      const res = await getProviders()
      setProviders(res)
    })()
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href = "/" className='flex gap-2 flex-center'>
        <Image 
          src = "/assets/images/logo.svg" 
          alt = "logo"
          width = {30}
          height = {30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href = "/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type = "button" onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href = "/profile">
              <Image
                src={session?.user.image}
                alt = "profile-image"
                width = {37}
                height = {37}
                className='rounded-full'
              />
            </Link>
          </div>
        ):(
          <>
            <Link
              href = "/login"
              className='black_btn'
            >
              Login Page
            </Link>
          </>
        )}
      </div>
      
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              alt = "profile-image"
              width = {37}
              height = {37}
              className='rounded-full'
              onClick={()=>settoggleDropdown((prev)=>!prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                  href = "/profile"
                  className='dropdown_link'
                  onClick = {() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href = "/create-prompt"
                  className='dropdown_link'
                  onClick = {() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button 
                  type = "button"
                  onClick = {()=>{
                    settoggleDropdown(false)
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>

              </div>
            )}
          </div>
        ):(
          <>
          {providers && 
            Object.values(providers).map((provider)=>(
              <button
                type = "button"
                key = {provider.name}
                onClick ={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In({provider.name})
              </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
