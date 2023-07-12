import React from 'react'
import Image from 'next/image';
import {GrDocument} from 'react-icons/gr';

const FolderContainer = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [warningAlert, setWarningAlert] = React.useState(false);
    const [val, setVal] = React.useState('');

    const handleClose = () => {
        setShowModal(false);
        setWarningAlert(false)
    }

    const inputRef = React.useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        setVal(inputRef.current.value);
        if (val.length > 0) setShowModal(false);
        if (val.length == 0) setWarningAlert(true)
    }

  return (
    <>
        <section className="flex justify-between flex-wrap mt-2 py-5">
            <p className="my-1 text-slate-600 text-sm ">
              Folders
            </p>
            <div className="flex justify-between items-center mt-2 bg-black	 rounded px-3 py-1">
              <GrDocument className='text-white'/>
              &nbsp;
              <p className='text-white'>New Folders</p>
            </div>
        </section>
        <section>
            <div className="flex flex-col items-center bg-white dark:bg-night-blue p-5">
                <div  className="flex flex-col items-center  ">
                    <Image
                        width={600}
                        height={600}
                        src="/folder.jpg"
                        alt="folders"
                        className='object-contain py-5 text-gray-400'
                        />
                    <div onClick={() => setShowModal(true)} className="flex items-center mt-2 bg-white	border-gray-400 border-solid border-2 rounded px-3 py-1">
                        <GrDocument className='text-black'/>
                        &nbsp;
                        <p className='text-gray-400'>New Folders</p>
                    </div>
                </div>
            </div>
        
        </section>
        <>
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {
                        warningAlert && (
                            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded" role="alert">
                                <p className="font-bold">Oops...</p>
                                <p>Please type something in the input box.</p>
                            </div>
                        )
                    }
                    {/*content*/}
                    <form onSubmit={submitHandler}
                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 rounded-t">
                            <p className="text-xl font-semibold">
                                New Folder
                            </p>
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
                            <div className='flex items-center'>
                                <div className='py-4 px-4 border-r-0 border-2 border-solid border-slate-200'>
                                    <GrDocument className='text-black'/>
                                </div>
                                <input className='py-3 px-3 border-2 border-solid border-slate-200 w-96' 
                                placeholder='Untitled folder' type="text" name="" id="" 
                                ref={inputRef}/>
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
            ) : null}
        </>

    </>

  )
}

export default FolderContainer;