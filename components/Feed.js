'use client';
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  console.log(data)
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) =>(
        <PromptCard
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  
  const fetchPosts = async () =>{
    const response = await fetch(`/api/prompt/?timestamp=${new Date().getTime()}`)
    const data = await response.json()
    setPosts(data)
  }
  useEffect(()=>{
    fetchPosts();
    // const intervalId = setInterval(() => {
    //   console.log("hey")
    //   fetchPosts(); // Fetch every 5 seconds (5000 ms)
    // }, 20000);
    // return () => clearInterval(intervalId);
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input  
          type = "text"
          placeholder = "Search for a tag or a username"
          value = {searchText}
          onChange = {handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data = {posts}
        handleTagClick= {() => {}}
      />
    </section>
  ) 
}

export default Feed
