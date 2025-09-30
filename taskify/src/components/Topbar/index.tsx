import React from 'react'
import { Input } from '../ui/input'
import Button from '../ui/button'

const index = () => {
  return (
    <header className='w-full h-10 border-b border-border bg-card flex items-center justify-between px-6'>
      <div className='flex items-center gap-3'>
        <i className="fa-solid fa-layer-group text-primary text-4xl"></i>
        <div className='flex flex-col'>
          <span className='text-xs text-muted-foreground'>Projects / My Projects</span>
          <span className='text-base font-medium text-foreground'>My Projects</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='relative w-72'>
          <span className='material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[20px]'>search</span>
        <Input className='pl-10 h-9 bg-muted border-border text-sm text-foreground placeholder:text-muted-foreground' placeholder='Search tasks...' />
        </div>
        <Button variant='ghost' className='inline-flex items-center justify-center h-9 w-9 rounded-md'>
          <i className="fa-regular fa-bell text-foreground hover:text-primary"></i>
        </Button>
        <div className='h-8 w-8 rounded-full bg-primary bg-opacity-20 text-primary flex items-center justify-center text-sm font-semibold'>A</div>
      </div>
    </header>
  )
}

export default index