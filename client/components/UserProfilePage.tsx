import { useParams, Link } from 'react-router-dom'
import { useUserProfile } from '../hooks/useUserProfile'

function UserProfile() {
  const { username } = useParams<{ username: string }>()
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUserProfile(String(username))

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p>Error...</p>
  }

  return (
    <>
      <Link
        to={'/profiles'}
        className="btn-blue px-3 mx-3 flex justify-end justify-self-auto"
      >
        View Full Menu
      </Link>
      <div className="flex justify-center relative ">
        <div></div>
        <div className="grid grid-cols-1 gap-3">
          <img
            src={`../../images/avatars/${user.image}`}
            alt="user profile"
            className="w-64"
          />
          <strong className="flex justify-center">{user.username}</strong>
          <strong className="flex justify-center">{user.fullName}</strong>
          <strong className="flex justify-center">{user.location}</strong>
        </div>
      </div>
    </>
  )
}

export default UserProfile
