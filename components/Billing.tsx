import React, { useEffect, useState } from "react";
import Image from "next/image";
import billing from "../assets/billing.png";
import Link from "next/link";
import Title from "./Title";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceList from "./InvoiceList";
import { UserAuth } from "../app/authContext";

export default function Billing() {
  const [isStarted, setIsStarted] = React.useState(false);
  const { showModal, setShowModal, id, payments, subscriptions } = UserAuth();
  const [item, setItem] = useState<any>([])

  useEffect(() => {
    if (subscriptions) {
      let subscriptionArray: any[] = []
      subscriptions.forEach((element: { items: any; }) => {
        console.log("Element", element.items )
        subscriptionArray.push(element.items[0].plan)
      });
      setItem(subscriptionArray)
    }
  }, [subscriptions])

  console.log(payments, subscriptions, item)
  return (
    <>
      <div>
        <Title
          showModal={showModal}
          setShowModal={setShowModal}
          button={"Document"}
          title={"Billing"}
        />
      </div>
        {!isStarted && subscriptions.length === 0 && item ? (
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
            <InvoiceHeader numInvoices={subscriptions.length} />
            <InvoiceList invoices={item} /> 
        </div>
        }
    </>
  );
}