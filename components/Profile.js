import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete,keyword, setKeyword}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>
        {desc}
      </p>
      
      <form className='relative w-full flex-center'>
        <input  
          type = "text"
          placeholder = "Search for a tag or a username"
          value = {keyword}
          onChange = {(e)=>setKeyword(e.target.value)}
          required
          className='search_input peer'
        />
      </form>

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
