import React from 'react'
import { Input } from '../ui/input'
import Button from '../ui/button'

const index = () => {
  return (
    <header className='w-full h-20 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6'>
      <div className='flex items-center gap-3'>
        <i className="fa-solid fa-layer-group text-orange-400"></i>
        <div className='flex flex-col'>
          <span className='text-xs text-gray-400'>Projects / My Projects</span>
          <span className='text-base font-medium text-white'>My Projects</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='relative w-72'>
          <span className='material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]'>search</span>
        <Input className='pl-10 h-9 bg-gray-800 text-sm text-gray-200 placeholder:text-gray-500 focus:ring-0 focus:border-gray-600' placeholder='Search tasks...' />
        </div>
        <Button className='inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-300 hover:text-white hover:bg-gray-800'>
          <i className="fa-regular fa-bell"></i>
        </Button>
        <div className='h-8 w-8 rounded-full bg-orange-400/20 text-orange-300 flex items-center justify-center text-sm font-semibold'>A</div>
      </div>
    </header>
  )
}

export default index