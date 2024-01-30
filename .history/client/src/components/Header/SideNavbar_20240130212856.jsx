import { FaBars } from 'react-icons/fa6'
import { FaPlusCircle } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SideNavbar = () => {
  return (
    <div className="w-96 bg-[#14171F] h-[100vh]">
      <div className="flex flex-col ml-20 mt-16 gap-6">
        <div className="flex items-center gap-16 mb-20">
          <FaBars className="text-3xl text-white" />
          <Link to="/">
            <img
              src="/Union (1).svg"
              alt="logo"
              className="md:w-16 w-auto h-[2.5rem] md:h-auto ml-1 md:ml-0"
            />
          </Link>
        </div>
        <div className="bg-primary500 w-60 p-4 text-white flex items-center justify-start gap-2 rounded-md text-xl cursor-pointer">
          <FaPlusCircle />
          <h2>New Blog</h2>
        </div>
        <div className="bg-primary500 w-60 p-4 text-white flex items-center justify-start gap-2 rounded-md text-xl cursor-pointer">
          <FaPlusCircle />
          <h2>New Event</h2>
        </div>
        <div className="flex flex-col mt-8 text-sm">
          <div className="flex items-center justify-between w-60 text-white p-4 gap-4 rounded-md cursor-pointer">
            <div className="flex items-center gap-4">
              <img src="/file.png" alt="" />
              <h1>All posts</h1>
            </div>
            <IoIosArrowForward />
          </div>
          <div className="flex items-center justify-between w-60 text-white p-4 gap-4 rounded-md cursor-pointer">
            <div className="flex items-center gap-4">
              <img src="/file.png" alt="" />
              <h1>Manage blog</h1>
            </div>
            <IoIosArrowForward />
          </div>
          <div className="flex items-center justify-between w-60 text-white p-4 gap-4 rounded-md cursor-pointer">
            <div className="flex items-center gap-4">
              <img src="/file.png" alt="" />
              <h1>Manage events</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </div>
        <div>
          <span>Terms of service</span>
          <span>privacy</span>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar
