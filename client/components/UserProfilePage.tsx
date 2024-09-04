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
      <div className="p-1">
        <div className="flex justify-end">
          <Link to={'/profiles'} className="btn-blue px-3 py-2 rounded-md">
            View All Profiles
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-1 ">
        <div className="flex flex-col items-center text-center">
          <img
            src={`../../images/avatars/${user.image}`}
            alt="user profile"
            className="w-64 rounded-full mb-4"
          />
          <strong className="text-xl">{user.username}</strong>
          <strong className="text-lg">{user.fullName}</strong>
          <strong className="text-md">{user.location}</strong>
        </div>
      </div>
    </>
  )
}

export default UserProfile
