import { useQuery } from "@tanstack/react-query";
import BlogData from "./BlogData";
import axios from "axios";
import { useEffect, useState } from "react";


const BlogsToDisplay = ({ currentPage, blogArray }) => {
  const [displayIndex, setDisplayIndex] = useState([2, 3, 4, 5, 6, 7])
  const [superBlog, setSuperBlog] = useState({})

  const startingBlog = (page) => {
    const start = ((page - 1) * 7) + 1
    return start
  }

  useEffect(() => {
    const start = startingBlog(currentPage)
    const array = []
    // console.log(array)
    for (let i = start; i < start + 7; i++) {
      if (i === start) {
        // set super blog
        blogArray && setSuperBlog(blogArray[start] || {})
      } else {
        array.push(i)
      }
    }
    setDisplayIndex(array);
  }, [currentPage, blogArray])

  const TextLength = (text) => {
    const length = text.length || "";
    if (length > 65) {
      const textLength = text.slice(0, 65);
      const newText = textLength + "...";
      return newText;
    } else {
      return text + "...";
    }
  };



  return (
    <div className="flex flex-col w-full gap-8 px-4">
      {/* display blogs based on the current page */}
      {/* {page 2: 8 to 14 is 7 blogs} */}

      {currentPage && (
        // {/* superblog */ }
        <div className="grid sm:grid-cols-2 gap-7 sm:gap-10 lg:gap-14">
          <div className="flex flex-col order-2 w-full gap-2 text-left align-middle lg:gap-3">
            <button className="text-[15px] sm:text-[18px] text-[#7A6C65] font-[inter] font-normal p-2 sm:p-[12px] border-[0.5px] max-w-[73px] rounded-[8px] ">
              {Object.keys(superBlog).length !== 0 ? superBlog.blogType : 'Article'}
            </button>
            <span className="font-[inter] font-normal text-[14px] sm:text-base w-[103px] h-[20px] text-[#7A6C65] ">
              {Object.keys(superBlog).length !== 0 ? superBlog.date : ' 01 June 2023'}
            </span>
            <b className="font-[inter] text-base sm:text-lg lg:text-2xl font-semibold text-[#101828] w-full ">
              {Object.keys(superBlog).length !== 0 ? superBlog.title : ' The Impact of DevOps on Software Development and Deployment'}
            </b>
            <p className="w-full text-sm font-normal lg:text-base">
              {Object.keys(superBlog).length !== 0 ? TextLength(superBlog.description || "") : 'How do you create compelling presentations that wow your audience...'}
              {" "}
              <a
                className="underline text-text-dev-orange hover:opacity-70"
                href="#"
              >
                Read more
              </a>
            </p>
            <div className="flex items-center w-full gap-4">
              <img
                src="/Avatar.png"
                className="w-10 h-10 rounded-[200px]"
                alt="authorImg"
              />
              <span className="font-[inter] text-sm sm:text-base font-bold text-center ">
                {Object.keys(superBlog).length !== 0 ? superBlog.blogAuthor : ' Qawi'}
              </span>
            </div>
          </div>
          <div className="flex justify-end order-1 w-full h-full sm:order-2">
            <img
              className="w-356px h-155px sm:w-500px sm:h-full md:w-510px rounded-[8px]"
              src="/Image.png"
              alt=""
            />
          </div>
        </div>
      )}

      {
        currentPage && (
          // {/* other blogs */ }
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {displayIndex.map((index) => {
              const { id, date, title, description, blogAuthor, blogImage, blogType } = blogArray[index] || BlogData[index % 7];
              return (
                <div
                  key={id || index}
                  className="flex flex-col flex-grow border border-[#D4CECB] m-auto bg-white rounded-lg text-start"
                >
                  <div>
                    <div>
                      <img
                        className="w-full rounded-t-lg"
                        src={blogImage}
                        alt="image"
                      />
                    </div>
                    <div className="px-3 pt-3 pb-2">
                      <span className="font-[inter] text-lg sm:text-lg font-bold text-[#101828]">
                        {title}
                      </span>
                      <p className="mt-2 text-sm font-normal md:text-base">
                        {TextLength(description)}{" "}
                        <a
                          className="underline text-text-dev-orange hover:opacity-70"
                          href="#"
                        >
                          Read more
                        </a>
                      </p>

                      <div className="flex items-center w-full gap-4 pt-3">
                        <img src={blogAuthor.img} alt="authorImg" />
                        <span className="text">{blogAuthor.name}</span>
                        <span className="textLight">{date}</span>
                      </div>
                      <button className="text-[18px] font-medium text-[#7A6C65] font-[inter] p-[8px] border-[0.5px]  mt-4 rounded-[8px]">
                        {blogType}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
    </div >
  )
}





function BlogContent({ displayType }) {

  // store number of pages
  const [pagination, SetPagination] = useState([1, 2, 3])
  // holds the data fetch from the backend
  const [originalBlogArray, setOriginalBlogArray] = useState([])
  const [blogArray, setBlogArray] = useState([])
  // const [superBlog, setSuperBlog] = useState({})

  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['fetch blogs'],
    queryFn: async () => {
      const response = axios.get('/endpoint/api/articles')
      const blogs = response.json()
      return blogs
    }
  })


  useEffect(() => {
    data && setOriginalBlogArray(data)

    // save pagination in array
    const noOfPages = data ? Math.ceil(data.length / 7) : 5
    const end = (noOfPages < 1) ? 1 : noOfPages;
    const numbers = [];
    for (let i = 1; i <= end; i++) {
      numbers.push(i);
    }
    SetPagination(numbers)

    // handle super blog and other blogs
    // Array.isArray(data) && data.length > 0 && setSuperBlog((data).slice(0, 1)[0])
    const flippedArray = (data || []).slice().reverse();
    setBlogArray(flippedArray)
  }, [data])

  useEffect(() => {
    originalBlogArray.length !== 0 && setBlogArray(originalBlogArray)
  }, [data, originalBlogArray])

  useEffect(() => {
    if (displayType === 'articles') {
      const filteredBlogs = originalBlogArray.filter((blog) => {
        blog.blogType === 'Articles'
      })
      console.log('Articles')
      setBlogArray(filteredBlogs)

    }

  }, [displayType, originalBlogArray])

  useEffect(() => {
    if (displayType === 'news') {
      const filteredBlogs = originalBlogArray.filter((blog) => {

        blog.blogType === 'News'
      })
      console.log('News')
      setBlogArray(filteredBlogs)

    }

  }, [displayType, originalBlogArray])

  useEffect(() => {
    if (displayType === 'jobs') {
      const filteredBlogs = originalBlogArray.filter((blog) => {

        blog.blogType === 'Jobs'
      })
      console.log('Jobs')
      setBlogArray(filteredBlogs)

    }
  }, [displayType, originalBlogArray])
  useEffect(() => {

    if (displayType === 'all') {
      const filteredBlogs = originalBlogArray.filter((blog) => {

        blog.blogType === 'Jobs'
      })
      console.log('All')
      setBlogArray(filteredBlogs)

    }

  }, [displayType, originalBlogArray])


  const handlePagination = (page) => {
    setCurrentPage(page)
  }



  return (
    <div className="flex flex-col items-center justify-center overflow-hidden h-fit lg:h-fit ">
      <div className="flex flex-col gap-[50px] py-[4.5rem] lg:px-[7rem] md:px-12 px-4 max-w-[87.5rem] justify-center items-center">

        {/* pagination */}
        <div className="flex flex-row justify-end w-full gap-2 mr-5">
          {
            pagination.map(page => {
              return (
                <button
                  key={page}
                  onClick={() => handlePagination(page)}
                  className={`border py-[2px] text-black font-bold rounded-[5px] ${page === currentPage ? " px-3 bg-[#FFDCD0]" : " px-2"}`}>
                  {page}
                </button>
              )
            })
          }
        </div>

        {/* blogs */}
        <BlogsToDisplay blogArray={blogArray} currentPage={currentPage} />

        {/* pagination */}
        <div className="flex justify-center gap-2">
          {
            pagination.map(page => {
              return (
                <button
                  key={page}
                  onClick={() => handlePagination(page)}
                  className={`border py-[2px] text-black font-bold rounded-[5px] ${page === currentPage ? " px-3 bg-[#FFDCD0]" : " px-2"}`}>
                  {page}
                </button>
              )
            })
          }
        </div>
      </div>
    </div >
  );
}

export default BlogContent;

