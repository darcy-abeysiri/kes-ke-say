import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../apis/userApi'

function Users() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error...</p>
  }

  return (
    <>
      <h1>All Profiles...</h1>
    </>
  )
}
export default Users
