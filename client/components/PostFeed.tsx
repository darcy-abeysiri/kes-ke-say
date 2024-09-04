import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/posts'

export function PostFeed() {
  const { data: postData, isPending, isError } = usePosts()

  if (isPending) {
    return <p id="loading">Loading Posts</p>
  }

  if (isError) {
    return <p>Something went wrong...</p>
  }

  return (
    <>
      <div className="my-20 h-[100%] flex flex-col items-center justify-center">
        <div className='w-1/2 grid grid-cols-4 gap-3 pr-[8px]'>
          <p className="col-span-3 text-xl py-3">Les Posts</p>
          <Link to="/post">
            <button className="w-[100%] rounded-lg bg-[#364da1] py-3 px-6 font-sans text-md font-bold uppercase text-white shadow-md shadow-[#364da1]/20 transition-all hover:shadow-lg hover:shadow-[#364da1]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Add Post</button>
          </Link>
        </div>
        {postData.map((post) => (
          <div key={post.id} className="w-1/2 flex flex-col mt-5 ">
            <header className="flex flex-row gap-3 items-center mt-8  relative right-16">
              <img
                src={`images/avatars/${post.userImage}`}
                alt=""
                className="rounded-full h-[3rem]"
              />
              <div>{post.username}</div>
              <div className="text-sm text-gray-500">
                {dateFormat(post.createdAt)}
              </div>
            </header>

            <Link to={`/post/${post.id}`}>
              <article className="grid grid-cols-4 gap-3 border-2 p-2 shadow-md rounded-md">
                <div className="col-span-3 flex flex-col">
                  <div className="font-light text-sm pt-2">{`${post.body}`}</div>
                </div>

                <div className="flex items-center">
                  {post.image && (
                    <img
                      src={`${post.image}`}
                      alt=""
                      className="rounded-md shadow-md"
                    />
                  )}
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </>
  )

  function dateFormat(date: number) {
    return new Date(date).toLocaleString('en-NZ', {
      day: '2-digit',
      month: 'short',
    })
  }
}

export default PostFeed
