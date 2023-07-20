import { MdPlaylistAddCheck } from 'react-icons/md'
import { TbClockCheck } from 'react-icons/tb'
import Card from './Card'
import CardHeader from './CardHeader'
import Button from './Button'

export default function StepTwoCard () {
  return (
    <Card>
      <CardHeader
        title='Step 2'
        icon={<TbClockCheck />}
        subtitle='Once your review has been published by the platform, simply copy your post link followed by a screenshot of your review.'
      />
      <form className='flex flex-col gap-2 py-4'>
        <select id='input-select' className='text-xs py-2 px-1 border rounded-md text-slate-400'>
          <option selected disabled>Select a platform</option>f
          <option value='G2 Crowd'>G2 Crowd</option>
          <option value='Product Hunt'>Product Hunt</option>
          <option value='AlternativeTo'>AlternativeTo</option>
        </select>
        <input className='text-xs p-2 border rounded-md' type='text' placeholder='Paste your review link' />
        <div className='flex items-center gap-2'>
          <label className='appearance-none grow text-xs p-2 border rounded-md text-slate-400 cursor-pointer' htmlFor='input-file'>
            Upload your screenshot
          </label>
          <input className='hidden' type='file' id='input-file' placeholder='Upload your screenshot' />
          <Button
            variant='white'
            icon={<MdPlaylistAddCheck className='h-full w-auto' />}
            text='Submit'
          />
        </div>
      </form>
    </Card>
  )
}
