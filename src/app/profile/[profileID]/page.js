"use client"

import { useState, useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'

const MyProfile = ({params}) => {
  const profileID = params.profileID
  const router = useRouter();
  const {data: session} =  useSession()
  const [posts, setPosts] = useState([])
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method:"DELETE",
        });
        const filteredPosts = posts.filter((p)=> p._id !== post._id)
        setPosts(filteredPosts)
      }catch(err){
        console.log(err)
      }
    }
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch(`/api/users/${profileID}/posts`)
      const data = await response.json()
      setPosts(data)

    }
    if(profileID) fetchPosts();
  }, [session])
  
  return (
    <Profile
        name = {session?.user?.name || "My"}
        desc = "Welcome to your personalized profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile
