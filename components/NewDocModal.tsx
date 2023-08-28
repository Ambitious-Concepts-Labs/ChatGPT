import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { GrDocument } from "react-icons/gr";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const NewModal = (props: any) => {
  const { inputRef, handleClose, showModal, setShowModal, warningAlert, setWarningAlert, session } = props
  const [val, setVal] = React.useState("");
  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setVal(inputRef.current.value);
    if (inputRef.current.value.length > 0) setShowModal(!showModal);
    if (inputRef.current.value.length == 0) setWarningAlert(!warningAlert);
    await setDoc(
      doc(db, "users", session?.user?.email, "folders", inputRef.current.value),
      {
        name: inputRef.current.value,
        createdAt: serverTimestamp(),
        id: uuidv4(),
      },
    );
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {warningAlert && (
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded"
              role="alert"
            >
              <p className="font-bold">Oops...</p>
              <p>Please type something in the input box.</p>
            </div>
          )}
          {/*content*/}
          <form
            onSubmit={submitHandler}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="flex items-start justify-between p-5 rounded-t">
              <p className="text-xl font-semibold">New Folder</p>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex items-center">
                <div className="py-4 px-4 border-r-0 border-2 border-solid border-slate-200">
                  <GrDocument className="text-black" />
                </div>
                <input
                  className="py-3 px-3 border-2 border-solid border-slate-200 w-96"
                  placeholder="Untitled folder"
                  type="text"
                  name=""
                  id=""
                  ref={inputRef}
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6">
              <button
                className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleClose()}
              >
                Close
              </button>
              <button
                className="bg-black text-white active:bg-gray font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NewModal;