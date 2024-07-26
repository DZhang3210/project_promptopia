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
      const likeResult = await getLikeStatus(session.user.id, post._id)
      setLiked(likeResult)
    }
    initializeLiked()
  },[session, post._id])

  return (
    <div className='prompt_card'>
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
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator?.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick = {handleCopy}>
          <Image
            src = {copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt = "copied-check"
            width = {12}
            height = {12}
          />

        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p 
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick = {() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      <div className='w-full flex py-2'>
        <button
          onClick = {toggleLike}
          disabled = {isProcessing}
        >
          <FontAwesomeIcon 
            icon={faHeart} 
            className={'transition origin-center hover:scale-110 ' + (liked ? 'text-pink-600':"")}
          /> 
        </button>
      </div>
      {session?.user.id === post?.creator?._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick = {handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick = {handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
