"use client";

import React from "react";
import { Survey } from "./(components)/components";
import Title from "../../../components/Title";
import { UserAuth } from "../../../app/authContext";

function Feedback() {
  const {firebaseUser } = UserAuth();
  const { showModal, setShowModal } = UserAuth();
  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button="Document"
        title="Feedback"
      />
      <Survey session={firebaseUser} />
    </>
  );
}

export default Feedback;