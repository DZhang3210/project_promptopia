import Link from 'next/link'
import { Suspense } from 'react'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col border-b-orange-600 border-b-4'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, towards powering the world
      </p>
      <form 
        onSubmit = {handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Your AI Prompt
        </span>
        <textarea
          value = {post.prompt}
          onChange = {(e) => setPost({...post, prompt:e.target.value})}
          placeholder='Write your prompt here'
          required
          className='form_textarea'
        />
      </label>
      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Tag {` `}
          <span className='font-nromal'>(#product, #webdevelopment, #idea)</span>
        </span>
        <textarea
          value = {post.tag}
          onChange = {(e) => setPost({...post, tag:e.target.value})}
          placeholder='#tag'
          required
          className='form_input'
        />
      </label>
      <div className='flex flex-end mt-2 pr-2 gap-4 w-full'>
        <Link href ="/" className='text-gray-500 text-lg'>
          Cancel
        </Link>
        <button 
          type = "submit"
          disabled = {submitting}
          className='px-5 py-1.5 text-lg bg-primary-orange rounded-full text-white'
        >
          {submitting ? `${type}...` : type}
        </button>
      </div>
      </form>
    </section>
  )
}

export default Form
