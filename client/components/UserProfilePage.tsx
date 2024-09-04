import { useParams, Link } from 'react-router-dom'
import { useUserProfile } from '../hooks/useUserProfile'


function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading, isError, error } = useUserProfile(Number(id))

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p>Error...</p>
  }

  return (
    <><div className="grid grid-cols-1">

      <div>
        <Link to={/users/} />}>
        <button className="grid grid-cols-1 border rounded-r-lg bg-slate-300">
          View All Profiles
        </button>
      </Link>
    </div><img
        src={`../../images/avatars/${user.image}`}
        alt="user profile"
        className="w-64" /><strong>{user.username}</strong><strong>{user.fullName}</strong><strong>{user.location}</strong></>
    </div>
  )
}

export default UserProfile
