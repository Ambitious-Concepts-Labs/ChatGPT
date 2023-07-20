import { Link, useLocation } from 'react-router-dom'

export default function NavList ({ title, items }) {
  const location = useLocation()
  return (
    <div>
      <div className='uppercase text-2xs font-semibold pb-3 tracking-wider text-slate-400'>{title}</div>
      <ul className='flex flex-col gap-2.5'>
        {
           items.map((item, i) => (
             <li key={i} className='flex items-center justify-between'>
               <Link
                 to={item.path}
                 className={`${location.pathname === item.path ? '' : 'text-slate-400'} flex items-center gap-3`}
               >
                 <span className={`${location.pathname === item.path ? 'border-black' : 'border-slate-400'}`}>{item.icon}</span>
                 <span className='font-medium text-xs tracking-wide'>{item.title}</span>
               </Link>
               {
                item.badge && (
                  <div className='px-2 py-0.5 rounded-full bg-primary font-semibold text-2xs'>
                    {item.badge}
                  </div>
                )
               }
             </li>
           ))
         }
      </ul>
    </div>
  )
}
