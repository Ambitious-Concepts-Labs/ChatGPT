// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import React from "react";
import Documents from "../../../components/Documents";
// import Filters from "../../../components/Filters";
import Title from "../../../components/Title";
import { UserAuth } from "../../../app/authContext";

const MainDocuments = () => {
  const { firebaseUser, documents, showModal, setShowModal, user, id } = UserAuth();

  return (
    <div>
      <Title
        showModal={showModal}
        setShowModal={setShowModal}
        button={"Document"}
        title={"Documents"}
      />
      {/* <Filters /> */}
      <Documents
        setShowModal={setShowModal}
        documents={documents}
        session={firebaseUser}
      />
    </div>
  );
};

export default MainDocuments;