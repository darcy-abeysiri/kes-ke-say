import { useQuery } from '@tanstack/react-query'
import { getAllGroups } from '../apis/groups'

export default function AllGroups() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getAllGroups(),
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error</p>
  }

  console.log('All Groups: ', data)

  return (
    <>
      <button type="submit" className="button-primary">
        Add a group
      </button>
      {data?.map((groups) => (
        <div key={groups.id}>
          <div>
            <img
              src={`../../Public/images/icons/${groups.image}`}
              alt={`${groups.image}`}
            />
            <p>{groups.name}</p>
          </div>
        </div>
      ))}
    </>
  )
}
