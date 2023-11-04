import 'server-only'
import React from "react";
import Title from "../../../components/Title";
import { Subscriptions } from './(components)/components';

export default function Billing() {

  return (
    <>
      <div>
        <Title
          button="Document"
          title="Billing"
        />
      </div>
      <Subscriptions />
    </>
  );
}