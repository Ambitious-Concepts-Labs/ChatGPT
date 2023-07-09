import Layout from '../components/user/layout'
import { DataProvider } from '../utils/DataContext'
import Card from "../components/user/card";
import { BsPersonFill, BsPeopleFill } from 'react-icons/bs'
import {GiCargoShip} from 'react-icons/gi'
import {GrDocument} from 'react-icons/gr'
import DocumentContainer from "../components/user/DocumentContainer";


export default function Home() {

  return (
    <DataProvider>
      <Layout> 
        <div>
          <section className="flex justify-between flex-wrap mt-2">
            <p className="my-1 text-slate-600 text-sm ">
              Dashboard
            </p>
            <div className="flex justify-between items-center mt-2 bg-black	 rounded px-3 py-1">
              <GrDocument className='text-white'/>
              &nbsp;
              <p className='text-white'>New Document</p>
            </div>
          </section>

          <section className="flex justify-between flex-wrap mt-2 text-black">
            <Card 
              bgHover='hover:bg-blue-600 dark:hover:bg-blue-800'
              textHover='hover:text-white'
              heading='Doucments'
              number='1'
              iconbg='bg-blue-600 dark:bg-blue-800'
              icon={<BsPersonFill/>} 
            />

            <Card 
              bgHover='hover:bg-teal-500 dark:hover:bg-teal-700'
              textHover='hover:text-white'
              heading='Drafts'
              number='100%'
              iconbg='bg-teal-500 dark:bg-teal-700'
              icon={<BsPeopleFill/>}
            />

            <Card 
              bgHover='hover:bg-pink-500 dark:hover:bg-pink-700'
              textHover='hover:text-white'
              heading='Published'
              number='0%'
              iconbg='bg-pink-500 dark:bg-pink-700'
              icon={<GiCargoShip/>}
            />

            <Card 
              bgHover='hover:bg-pink-500 dark:hover:bg-pink-700'
              textHover='hover:text-white'
              heading='Token Usage'
              number='0%'
              iconbg='bg-pink-500 dark:bg-pink-700'
              icon={<GiCargoShip/>}
            />
          </section>

          <DocumentContainer/>
        </div>
      </Layout>
    </DataProvider>
  )
}
