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
      <div className="grid grid-cols-1">
        <div>
          <Link
            to={'/profiles'}
            className="flex flex-cols-1 border rounded-r-lg bg-slate-300"
          >
            View Full Menu
          </Link>
        </div>
        <img
          src={`../../images/avatars/${user.image}`}
          alt="user profile"
          className="w-64"
        />
        <strong>{user.username}</strong>
        <strong>{user.fullName}</strong>
        <strong>{user.location}</strong>
      </div>
    </>
  )
}

export default UserProfile
