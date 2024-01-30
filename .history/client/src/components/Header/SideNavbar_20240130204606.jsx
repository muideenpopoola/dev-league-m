import { FaBars } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const SideNavbar = () => {
  return (
    <div className="w-80 bg-[#14171F] h-[100vh]">
      <div className="flex items-center justify-center mx-auto my-20 text-white">
        <div className="flex justy-center items-center gap-10">
          <FaBars className="text-2xl" />
          <Link to="/">
            <img
              src="/Union (1).svg"
              alt="logo"
              className="md:w-12 w-auto h-[2.5rem] md:h-auto ml-1 md:ml-0"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar
