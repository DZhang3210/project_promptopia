import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete,keyword, setKeyword, filterSelection, setFilterSelection}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>
        {desc}
      </p>
      
      <form className='relative w-full flex-center mt-4'>
        <input  
          type = "text"
          placeholder = "Search for a tag or a username"
          value = {keyword}
          onChange = {(e)=>setKeyword(e.target.value)}
          required
          className='search_input peer'
        />
      </form>

      <div className='mt-4 flex *:px-10 *:py-2 text-xl'>
        <div 
          className={'bg-white border-b-4 cursor-pointer ' + (filterSelection ===0 ?"border-blue-300":"")}
          onClick = {()=>{setFilterSelection(0);}}
        
        >
          Your Posts
        </div>
        <div 
          className={'bg-white border-b-4 cursor-pointer ' + (filterSelection ===1 ?"border-blue-300":"")}
          onClick = {()=>{setFilterSelection(1);}}
        >
          Liked Posts
        </div>
      </div>

      <div className='mt-16 prompt_layout'>
        {data.map((post) =>(
          <PromptCard
            key = {post._id}
            post = {post}
            handleEdit = {() => handleEdit && handleEdit(post)}
            handleDelete = {() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>

    </section>
  )
}

export default Profile
