import { useQuery } from '@tanstack/react-query'
import { getAllGroups } from '../apis/groups'

export default function AllGroups() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getAllGroups(),
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  return (
    <>
      <div className="clearfix">
        <button
          type="submit"
          className="float-right bg-[#333333] text-white fond-bold mr-5 mb-10 mt-10 py-2 px-4 rounded w-40"
        >
          Add a group
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 place-content-center">
        {data?.map((groups) => (
          <div key={groups.id} className="w-40 ml-20">
            <div>
              <img
                src={`../../Public/images/icons/${groups.image}`}
                alt={`${groups.image}`}
              />
              <p className="text-center">{groups.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
