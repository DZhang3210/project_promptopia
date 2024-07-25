'use client'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

const ProvidersLogin = () => {
    const router = useRouter()
    const { data: session } =  useSession()

    useEffect(()=>{
        const verifyUser = async () => {
            if(session){
                router.push('/')
            }
        }
        verifyUser()
    },[session])
  const handleSignUp = async (provider) => {
    await signIn(provider)
  }
  return (
    <div className='mx-auto mt-[10rem] shadow-lg p-12 bg-gray-200 flex justify-center items-center flex-col gap-10 text-xl'>
      <div className='flex flex-col items-center gap-4'>
        <Image
            src = "/assets/images/logo.svg"
            alt = "logo"
            height = {90}
            width = {90}
        />
        <div className='text-3xl font-semibold'>Login</div>
        <div className='text-xl'>Welcome back</div>
      </div>
      <div className='flex flex-col gap-5 w-full'>
        <button onClick = {() => handleSignUp('google')}>
            <div className='flex items-center gap-2 rounded-xl border-2 border-black p-2 transition hover:text-white hover:bg-black py-1 w-full justify-center px-4 md:px-40'>
                <FontAwesomeIcon icon={faGoogle} />
                <span>Login with Google</span>
            </div>
        </button>
        <div className='flex w-full items-center gap-2'>
            <hr className='grow bg-black h-[2px]'/>
            <div className='text-lg'>OR</div>
            <hr className='grow bg-black h-[2px]'/>
        </div>
        <button onClick = {() => handleSignUp('github')}>
            <div className='flex items-center gap-2 rounded-xl border-2 border-black p-2 transition hover:text-white hover:bg-black py-1 justify-center px-4 md:px-40'>
                <FontAwesomeIcon icon={faGithub} />
                <span>Login with Github</span>
            </div>
        </button>
      </div>
    </div>
  )
}

export default ProvidersLogin
