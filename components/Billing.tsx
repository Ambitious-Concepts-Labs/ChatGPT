import React, { useState } from "react";
import Image from "next/image";
import billing from "../assets/billing.png";
import Link from "next/link";
import Title from "./Title";
import { UserAuth } from "../app/authContext";
import styles from '../styles/MainInvoice.module.css';
import { HiChevronRight } from "react-icons/hi2";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceList from "./InvoiceList";
import VehiclesTabContent from "./VehicleTabContent";
import { BiPlusMedical } from "react-icons/bi";
import VehiclesTableRow from "./VehiclesTabRow";

export default function Billing(props: any) {
  const { session } = props
  const [isStarted, setIsStarted] = React.useState(false);
  const { showModal, setShowModal } = UserAuth();
  const invoices = [
      {
        id: 1,
        createdAt: "2021-06-30",
        description: 'hello description',
        status: 'paid',
        items: [
            {
                id:"1", 
                name:'item one',
                quantity: 90,
                price: 80,
                itemTotal: 900,
            },
            {
                id:"2", 
                name:'item two',
                quantity: 190,
                price: 820,
                itemTotal: 900,
            },
        ],
        total: 90,
        paymentDue: 80,
        senderAddress: {
            street: 'street',
            city: 'dallas',
            postCode: 777777,
            country: 'usa'
        },
        clientEmail : '<NAME>',
        clientName: 'name',
        clientAddress: {
            street: 'street',
            city: 'dallas',
            postCode: 777777,
            country: 'usa'
        },
    },{
        id: 1,
        createdAt: "2021-06-30",
        description: 'hello description',
        status: 'pending',
        items: [
            {
                id:"1", 
                name:'item one',
                quantity: 90,
                price: 80,
                itemTotal: 900,
            },
            {
                id:"2", 
                name:'item two',
                quantity: 190,
                price: 820,
                itemTotal: 900,
            },
        ],
        total: 90,
        paymentDue: 80,
        senderAddress: {
            street: 'street',
            city: 'dallas',
            postCode: 777777,
            country: 'usa'
        },
        clientEmail : '<NAME>',
        clientName: 'name',
        clientAddress: {
            street: 'street',
            city: 'dallas',
            postCode: 777777,
            country: 'usa'
        },
    },
     ]
    const [logData, setLogData] = useState([
      {
      id: '01',
      transporter: 'Johnson C',
      location: 'Lagos',
      currentLocation: 'Ikorodu',
      logStatus: 'In Transit',
      vehicleNumber: 'ET-272-KJA',
      vehicleName: 'Toyota Highlander 2004',
      destination: 'Ikeja',
      img: '/transporter-1.jpg'
      },
      {
      id: '02',
      transporter: 'Jeremy Lopez',
      location: 'Lagos',
      currentLocation: '',
      logStatus: 'Cancelled',
      vehicleNumber: 'LG-272-KJA',
      vehicleName: 'Lexus 350 2000',
      destination: 'Ikeja',
      img: '/transporter-2.jpg'
      },
      {
      id: '03',
      transporter: 'Indiana Jones',
      location: 'Abuja',
      currentLocation: '',
      logStatus: 'Completed',
      vehicleNumber: 'AJ-111-KVF',
      vehicleName: 'Toyota Highlander 2004',
      destination: 'Lokoja',
      img: '/transporter-3.jpg'
      },
      {
      id: '04',
      transporter: 'Pietro J',
      location: 'Port Harcourt',
      currentLocation: 'Yenegoa',
      logStatus: 'In Transit',
      vehicleNumber: 'PH-144-KSJ',
      vehicleName: 'Ford F150',
      destination: 'Abuja',
      img: '/transporter-4.jpg'
      },
    ]);
  let color: number[];
  const getStatusColors = (statusName: string) => {
    let color: number[];
    let status
    statusName = statusName.toLowerCase();
    switch (statusName) {
        case 'pending':
            color = [255, 143, 0]
            break;
        case 'paid':
            color = [51, 214, 159]
            break;
        case 'draft':
            color = [55, 59, 83]
            break;
        default:
            color = []
            break;
    }
    return color;
  }

  return (
    <>
      <div className="bg-[#f8f9fb] grow px-8 md:px-16 pt-7 pb-10">
        <Title
          showModal={showModal}
          setShowModal={setShowModal}
          button={"Document"}
          title={"Billing"}
          session={session}
        />
      </div>
      {/* <div className="flex flex-col w-4/5 h-auto px-5 my-4 py-5 bg-white justify-center items-center"> */}
        {!isStarted ? (
          <>
            <Image src={billing} alt="billing" width={500} />
            <p className="mb-10 text-black/60">
              You do not have any active plans
            </p>
            <Link
              className=" mb-5 bg-yellow-400 rounded p-2 text-black/60"
              href={"/pricing"}
            >
              Select a plan
            </Link>
          </>
        ): 
        <div>
            {/* {invoices.map(invoice => <Invoice key={invoice.id} invoice={invoice} />)} */}
            <InvoiceHeader numInvoices={invoices.length} />
            <InvoiceList invoices={invoices} /> 
            <div className='mt-1 p-3 pb-3 bg-slate-100 dark:bg-night-black rounded-b w-full'>
              <VehiclesTabContent index='1'>
                <div className='overflow-x-auto whitespace-nowrap'>
                  <table className='w-full table-auto'>
                    <tbody className='overflow-x-auto'>
                      {logData.map((data) =>{ 
                        return <VehiclesTableRow 
                        key={data.id} 
                        data={data} /> }
                      )}
                    </tbody>
                  </table>
                </div>
              </VehiclesTabContent>    
            </div>
        </div>
        }
      {/* </div> */}
    </>
  );
}