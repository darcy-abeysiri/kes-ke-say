import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import User from '../../models/user'

function useDogProfile(dogId: number) {
  return useQuery({
    queryKey: ['dog', dogId],
    queryFn: () => getDogById(dogId),
  })
}
const getDogById = async (id: number): Promise<Dog> => {
  const response = await fetch(`/api/v1/dogs/${id}`)
  return response.json()
}

function DogProfile() {
  const { dogId } = useParams<{ dogId: string }>()
  const { data: dog, isPending, isError, error } = useQuery(Number(dogId))

  if (isPending) {
    return <p>loading...</p>
  }

  if (isError) {
    console.error(error?.message)
    return <p>❗️❗️❗️BROKEN❗️❗️❗️</p>
  }

  if (!dog) {
    return <p>Cannot find Dog</p>
  }

  return (
    <div className="grid grid-cols-1">
      <img
        src="../../client/public/dog_profile.jpg"
        alt="dog profile"
        className="w-64"
      />
      <h3>Name: {dog.name}</h3>
      <p>Owner ID: {dog.ownerId}</p>
      <p>
        Address: {dog.street}, {dog.suburb}, {dog.city}
      </p>
      <p>{dog.isGood ? `🐶` : `👿`}</p>
    </div>
  )
}

export default DogProfile
