export default function ProgressBar ({ percentage }) {
  const PERCENTAGES = {
    quota: 'w-[14%]',
    token: 'w-[2%]'
  }
  return (
    <div className='bg-slate-100 rounded-xl h-2'>
      <div className={`bg-primary h-full rounded-s-xl ${PERCENTAGES[percentage]}`} />
    </div>
  )
}
