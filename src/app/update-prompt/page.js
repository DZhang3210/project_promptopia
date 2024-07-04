"use client"

import React, { Suspense } from 'react'
import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter, useSearchParams} from 'next/navigation'

import Form from '@/components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    const getPromptDetails = async() =>{
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }
    if(promptId) getPromptDetails()
  }, [promptId])
  // if(session?.user.id){
  //   router.push('/')
  // }

  const updatePrompt = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert('Prompt ID not found')
    try{
      const response = await fetch(`/api/prompt/${promptId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok){
        router.push('/')
      }
    }catch(err){
      console.log(err)
    }finally{
      setSubmitting(false); 
    }
  }
  return (
    <Suspense>
        <div>
        <Form
            type = "Edit"
            post = {post}
            setPost = {setPost}
            submitting = {submitting}
            handleSubmit = {updatePrompt}
        />
        </div>
    </Suspense>
  )
}

export default EditPrompt
