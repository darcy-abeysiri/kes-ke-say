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
    <div className="flex flex-col items-center">
      <div className="w-1/2">
        <div>
          <img
            src={post.image}
            alt=""
            className="
        rounded-3xl 
        shadow-lg
        shadow-gray-600
        m-10
                "
          />
        </div>

        {/* <h2>{post.username}</h2> */}
        <div>
          {/* <img src={`images/avatars/${post.userImage}`} alt={post.userImage} className=""/> */}
        </div>
        <div className="tre">{post.body}</div>
        <div className="text-slate-600">
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
      <Voting />
    </div>
  )
}
