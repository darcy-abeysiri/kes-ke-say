import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../apis/userApi'
import { User } from '../../models/user.ts'

function AllProfiles() {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
  })
  console.log(data)
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error...</p>
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

export default AllProfiles
