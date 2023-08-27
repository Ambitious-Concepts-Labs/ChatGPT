"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Survey from "../../../components/Survey";
import Title from "../../../components/Title";
import { UserAuth } from "../../context/AuthContext";

const Feedback = () => {
  const { data: session } = useSession();
  const { showModal, setShowModal } = UserAuth();
  return (
    <>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Document"}
        title={"Feedback"}
        session={session}
      />
      <Survey session={session} />
    </>
  );
};

export default Feedback;
