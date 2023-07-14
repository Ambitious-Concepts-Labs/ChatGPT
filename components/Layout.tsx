import React from "react"
import Sidebar from "./Sidebar2"

const Layout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenSidebar = () => {
    setIsOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className={`flex ${isOpen && 'overflow-hidden'}`}>
        <Sidebar isOpen={isOpen} handleCloseSidebar={handleCloseSidebar} />
        <div className='bg-[#f8f9fb] min-h-screen grow px-8 md:px-16 pt-7 pb-10'>
            {children}
        </div>
      </div>
    </>
  )
}

export default Layout