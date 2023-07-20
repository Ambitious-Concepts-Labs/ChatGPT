import { BsTrophy } from 'react-icons/bs'
import cardWoman from '../../assets/card-woman.webp'
import Card from './Card'
import CardHeader from './CardHeader'

export default function IncreaseCard () {
  return (
    <Card
      row
      span
    >
      <CardHeader
        title='Want to increase your monthly quota?'
        icon={<BsTrophy />}
        subtitle={<>If you are looking to increase your monthly token limit we offer generous rewards for your loyalty. By simply pubblishing a review about your experience with Writier, you can earn up to <span className='font-bold text-black'>50,000 free tokens per month!</span></>}
        className='sm:w-3/4'
      />
      <div className='h-40 lg:h-48 flex justify-center'>
        <img className='h-full w-auto' src={cardWoman} width={491} height={491} alt='Woman with a gift card' />
      </div>
    </Card>
  )
}
