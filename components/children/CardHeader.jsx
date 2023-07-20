export default function CardHeader ({ children, className, icon, title, subtitle }) {
  return (
    <div className={`flex items-start justify-between pb-2 ${className}`}>
      <div className='flex flex-col gap-4'>
        <div className='bg-slate-100 text-slate-500 p-2 h-8 w-8 flex items-center justify-center rounded-md text-xl'>
          {icon}
        </div>
        <h3 className='font-bold text-xs'>
          {title}
        </h3>
        <p className='text-slate-400 text-xs leading-5'>
          {subtitle}
        </p>
      </div>
      {children}
    </div>

  )
}
