"use client"

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {usePathname, useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getLikeStatus, handleLikeButton} from '@/actions/PromptCardActions'

const PromptCard = ({post, handleEdit, handleDelete, handleTagClick}) => {
  const [copied, setCopied] = useState("")
  const [liked, setLiked] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () =>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.creator?._id)
    setTimeout(() => setCopied(""),3000)
  }
  const toggleLike = async () => {
    setIsProcessing(true)
    setLiked(prev=>!prev)
    await handleLikeButton(session.user.id, post._id)
    setIsProcessing(false)
  }
  useEffect(()=>{
    const initializeLiked = async () => {
      // if(!session){

      // }
      if(session?.user?.id && post._id){
        const likeResult = await getLikeStatus(session.user?.id, post._id)
        setLiked(likeResult)
      }      
    }
    initializeLiked()
  },[session, post])

  return (
    <div className='w-full border-b-4 border-orange-500 bg-gray-1 rounded-t-lg00/80 text-gray-500 px-4 pt-1 mb-4'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <a href = {`/profile/${post.creator._id}`}>
            <Image
              src = {post?.creator?.image}
              alt = "user_image"
              width = {40}
              height = {40}
              className='rounded-full object-contain'
            />
          </a>
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-lg text-gray-950'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-600'>
              {post.creator?.email}
            </p>
            <p 
              className='font-inter text-sm cursor-pointer text-blue-800'
              onClick = {() => handleTagClick && handleTagClick(post.tag)}
            >
              {post.tag}
            </p>
          </div>
        </div>
        <div className='copy_btn mt-2' onClick = {handleCopy}>
          <Image
            src = {copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt = "copied-check"
            width = {25}
            height = {25}
          />
        </div>
        <button
          onClick = {toggleLike}
          disabled = {isProcessing}
          className='mt-2'
        >
          <FontAwesomeIcon 
            icon={faHeart}
            className={'transition text-2xl origin-center hover:scale-110 ' + (liked ? 'text-pink-600':"")}
          /> 
        </button>
      </div>
      <p className='my-4 font-satoshi text-lg text-black indent-2'>{post.prompt}</p>
      
      {session?.user.id === post?.creator?._id && pathName === '/profile' && (
        <>
        <div className='w-full h-[1px] bg-gray-300'>
        
        </div>
        <div className=' flex-center gap-4 border-t border-gray-100 py-3 font-bold'>
          <p
            className='font-inter text-md green_gradient cursor-pointer'
            onClick = {handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-md orange_gradient cursor-pointer'
            onClick = {handleDelete}
          >
            Delete
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default PromptCard
