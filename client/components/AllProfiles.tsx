import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../apis/userApi'
import { User } from '../../models/user.ts'

function Users() {
  const { data, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return error
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center border border-solid rounded-lg bg-slate-300"
        >
          <img
            src={`../../images/avatars/${user.image}`}
            alt="user profile"
            className="w-64 mt-5 mb-2.5"
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

export default Users
