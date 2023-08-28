// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export default function index (props: any) {
  const { variant, handleCheck } = props
  const VARIANTS = {
    normal: 'checked:bg-amber-500',
    danger: 'checked:bg-red-600'
  }
  return (
    <div className='flex items-center h-6'>
      <input
        onChange={handleCheck}
        type='checkbox'
        className={`h-4 w-8 appearance-none rounded-xl bg-slate-200 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2]  
        after:h-4 after:w-4 after:rounded-full after:border-none after:bg-slate-50 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:ml-[1.0625rem] 
        checked:after:h-4 checked:after:w-4 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer 
        focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-4 focus:after:w-4 focus:after:rounded-full focus:after:content-[''] 
        checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 
        ${VARIANTS[variant]}`}
      />
    </div>
  )
}