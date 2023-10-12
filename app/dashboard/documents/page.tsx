import 'server-only';
import React from "react";
import { Documents } from "../(components)/components"
// import Filters from "../../../components/Filters";
import Title from "../../../components/Title";

function MainDocuments() {

  return (
    <div>
      <Title
        button="Document"
        title="Documents"
      />
      {/* <Filters /> */}
      <Documents />
    </div>
  );
}

export default MainDocuments;