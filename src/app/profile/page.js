"use client"

import { useState, useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'
import {GetLikedPosts} from '@/actions/ProfilePageActions'

const MyProfile = () => {
  const router = useRouter();
  const {data: session} =  useSession()
  const [posts, setPosts] = useState([])
  const [keyword, setKeyword] = useState("")
  const [filterSelection, setFilterSelection] = useState(0)

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
        //console.log(err)
      }
    }
  }
  const fetchPosts = async () =>{
    const response = await fetch(`/api/users/${session?.user?.id}/posts?keyword=${keyword}`)
    const data = await response.json()
    setPosts(data)

  }
  const fetchLikedPosts = async() => {
    console.log(session?.user?.id, keyword)
    const response = await GetLikedPosts(session?.user?.id, keyword)
    //console.log('response',response)
    // const data = await response.json()
    setPosts(response)
  }
  useEffect(()=>{
    if(session?.user.id){
      //console.log(filterSelection, session, keyword)
      if (filterSelection === 0){
        console.log('Option 1')
        fetchPosts();}
      else {
        console.log('Option 2')  
        fetchLikedPosts()
      }
    }
  }, [session, keyword, filterSelection])
  
  return (
    <Profile
        name = {session?.user?.name || "My"}
        desc = "Welcome to your personalized profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
        keyword=  {keyword}
        setKeyword = {setKeyword}
        filterSelection = {filterSelection}
        setFilterSelection = {setFilterSelection}
    />
  )
}

export default MyProfile
