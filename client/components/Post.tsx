import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../apis/posts'
import Voting from './Voting'
import { Link, useParams } from 'react-router-dom'

export default function Post() {
  const { id } = useParams()
  const {
    data: post,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(Number(id)),
  })

  if (isPending) {
    return <p id="loading">Loading Posts</p>
  }

  if (isError) {
    return <p>Something went wrong...</p>
  }

  return (
    <div className="flex flex-col items-center m-10 ">
      <div className="w-1/2 shadow-md shadow-gray-600 p-10 rounded-md">
        <div className="size-full">
          <img
            src={post.image}
            alt=""
            className="
        rounded-3xl
        drop-shadow-md
        shadow-gray-600
        mb-10
                "
          />
        </div>

        {/* <h2>{post.username}</h2> */}

        <div className="text-lg">{post.body}</div>
        <div className="text-slate-600 my-5 italic flex flex-col-auto mt-20 ">
          <div className="size-[3rem] mr-5">
            {post.image && (
              <img
                src={`/images/avatars/${post.userImage}`}
                alt="User Avatar"
              />
            )}
          </div>
          <div className="">
            <p>
              Posted by{' '}
              <Link to={`/profiles/${post.username}`}>
                <strong>{post.username}</strong>
              </Link>{' '}
              on{' '}
              {`${new Date(post.createdAt).toLocaleString('en-NZ', { hour12: false })}`}
            </p>
          </div>
        </div>
        <div className="m-10">
          <Voting />
        </div>
      </div>
    </div>
  )
}
