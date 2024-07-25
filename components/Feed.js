'use client';
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
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
  
  const fetchPosts = async (searchText) =>{
    // const timestamp = Date.parse(new Date().toString());
    const response = await fetch(`/api/prompt?keyword=${searchText}`)
    const data = await response.json()
    setPosts(data)
  }
  useEffect(()=>{
    fetchPosts(searchText);
    // const intervalId = setInterval(() => {
    //   console.log("hey")
    //   fetchPosts(); // Fetch every 5 seconds (5000 ms)
    // }, 20000);
    // return () => clearInterval(intervalId);
  }, [searchText])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input  
          type = "text"
          placeholder = "Search for a tag or a username"
          value = {searchText}
          onChange = {(e)=>setSearchText(e.target.value)}
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
