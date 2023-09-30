import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import Arthur from '../../../../assets/brands/arthur_logo.png'
import FiscalNote from '../../../../assets/brands/fiscalnote_logo.png'
import HuggingFace from '../../../../assets/brands/huggingface_logo.png'
import HumanLoop from '../../../../assets/brands/humanloop_logo.png'
import OpenAI from '../../../../assets/brands/openai_logo.png'
import Preamble from '../../../../assets/brands/preamble_logo.png'
import Scale from '../../../../assets/brands/scale_logo.png'
import Snorkel from '../../../../assets/brands/snorkel_logo.png'
import Stability from '../../../../assets/brands/stability_logo.png'
import Towards from '../../../../assets/brands/towards_logo.png'
import Trustible from '../../../../assets/brands/trustible_logo.png'
import VoiceFlow from '../../../../assets/brands/voiceflow_logo.png'
import ChefBetters from '../../../../assets/brands/chefbetters_logo.png'
import Aimly from '../../../../assets/brands/aimly_logo.png'
import DJSmoothHoly from '../../../../assets/brands/djsmoothholy_logo.png'
import SocialRing from '../../../../assets/brands/socialring_logo.png'
import Meta from '../../../../assets/brands/meta_logo.png'

export default function Slider () {
  const brandsLogos = [
    // {
    //   id: 1,
    //   brand: 'Stability',
    //   logo: Stability
    // },
    // {
    //   id: 2,
    //   brand: 'Hugging Face',
    //   logo: HuggingFace
    // },
    // {
    //   id: 3,
    //   brand: 'Human Loop',
    //   logo: HumanLoop
    // },
    // {
    //   id: 4,
    //   brand: 'Preamble',
    //   logo: Preamble
    // },
    // {
    //   id: 5,
    //   brand: 'VoiceFlow',
    //   logo: VoiceFlow
    // },
    // {
    //   id: 6,
    //   brand: 'Arthur',
    //   logo: Arthur
    // },
    // {
    //   id: 7,
    //   brand: 'Snorkel',
    //   logo: Snorkel
    // },
    // {
    //   id: 8,
    //   brand: 'Towards',
    //   logo: Towards
    // },
    // {
    //   id: 9,
    //   brand: 'Trustible',
    //   logo: Trustible
    // },
    // {
    //   id: 10,
    //   brand: 'FiscalNote',
    //   logo: FiscalNote
    // },
    // {
    //   id: 11,
    //   brand: 'Scale',
    //   logo: Scale
    // },
    {
      id: 12,
      brand: 'Open AI',
      logo: OpenAI
    },
    {
      id: 13,
      brand: 'Chef Betters',
      logo: ChefBetters
    },
    {
      id: 14,
      brand: 'Go Aimly',
      logo: Aimly
    },
    {
      id: 15,
      brand: 'Dj Smooth Holy',
      logo: DJSmoothHoly
    },
    {
      id: 16,
      brand: 'Social Ring',
      logo: SocialRing
    },
    {
      id: 17,
      brand: 'Meta',
      logo: Meta
    },
  ]
  return (
    <div className='pt-20'>
      <Marquee gradient={false} speed={30} className='overflow-hidden'>
        {
        brandsLogos.map(brandLogo => (
          <a key={brandLogo.brand} href='#' className='w-40 h-20 md:w-48 md:h-24 px-4 flex items-center justify-center hover:scale-110 duration-150'>
            <Image
              src={brandLogo.logo}
              alt={`${brandLogo.brand}'s logo`}
              className='object-contain'
            />
          </a>
        ))
        }
      </Marquee>
      <div>
        <p className='text-center opacity-80 font-medium pt-4 pb-8 text-xs md:text-lg font-vietnam'>
          Proudly Sponsored by Ambitious Concepts
        </p>
        {/* <p className='text-center opacity-80 font-medium pt-4 pb-8 text-xs md:text-lg font-vietnam'>
          Proudly Sponsored by Industry-Leading AI Companies
        </p> */}
      </div>
    </div>
  )
}
