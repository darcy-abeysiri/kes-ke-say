import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../apis/userApi'
import { User } from '../../models/user'

function Users(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  })
}
const getUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/v1/users/${id}`)
  return response.json()
}

function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error } = useQuery(Number(id))

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p>❗️❗️❗️BROKEN❗️❗️❗️</p>
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center border- border-solid rounded-lg bg-slate-300"
        >
          <img
            src={`../../images/avatars/${user.image}`}
            alt="user profile"
          ></img>
          <div>
            <h3>
              <strong>{user.username}</strong>
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
s

export default UserProfile
