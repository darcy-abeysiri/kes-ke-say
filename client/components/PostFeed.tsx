import { Post } from '../../models/post'
import { usePosts } from '../hooks/posts'

export function PostFeed() {
  const { data, isPending, isError } = usePosts()

  if (isPending) {
    return <>Loading Posts</>
  }

  if (isError) {
    return <>Something went wrong...</>
  }

  const postData = data as Post[]

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        {postData.map((post) => (
          <div key={post.id} className="w-1/2 flex flex-col mt-5">
            <header className="flex flex-row gap-3 items-center">
              {/* <img src="https://picsum.photos/30/30" className="rounded-full" /> */}
              <div> User Name </div>
              <div className="text-sm text-gray-500">
                {post.createdAt}
              </div>
            </header>

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-3 flex flex-col">
                <div className="font-bold text-lg pt-3">Post Link Text</div>

                <div className="font-light text-sm pt-2">{`${post.body}`}</div>
              </div>

              <div className="flex items-center">
                <img src={`${post.image}`} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  // function dateFormat(date: string | number) {
  //   return new Date(date).toLocaleString('en-NZ', {
  //     day: '2-digit',
  //     month: 'short',
  //   })
  // }
}

export default PostFeed
