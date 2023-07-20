import { FaRegStar } from 'react-icons/fa6'
import G2Logo from '../../utils/logos/G2Logo'
import ProductHuntLogo from '../../utils/logos/ProductHuntLogo'
import AlternativeToLogo from '../../utils/logos/AlternativeToLogo'
import Card from './Card'
import CardHeader from './CardHeader'

export default function StepOneCard () {
  const appsList = [
    {
      logo: <G2Logo />,
      name: 'G2 Crowd',
      tokens: '20,000'
    },
    {
      logo: <ProductHuntLogo />,
      name: 'Product Hunt',
      tokens: '10,000'
    },
    {
      logo: <AlternativeToLogo />,
      name: 'AlternativeTo',
      tokens: '10,000'
    }
  ]
  return (
    <Card>
      <CardHeader
        title='Step 1'
        subtitle='Pubblish an honest review about our app on one (or all) of the platforms below.'
        icon={<FaRegStar />}
      />
      <ul className='flex flex-col gap-4 py-4'>
        {
        appsList.map(app => (
          <li key={app.name} className='text-xs grid items-center grid-cols-[2.5rem_repeat(3,1fr)] cursor-pointer'>
            <div className='h-6 w-6'>
              {app.logo}
            </div>
            <div>{app.name}</div>
            <div className='justify-self-center'>{app.tokens} Tokens</div>
            <div className='justify-self-end flex items-center gap-1.5'>
              <div className='h-2 w-2 rounded-full bg-green-400' />
              <div>Available</div>
            </div>
          </li>
        ))
            }
      </ul>
    </Card>
  )
}
