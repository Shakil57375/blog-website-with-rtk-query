import { useSelector } from "react-redux"
import { selectPostIds, useGetPostsQuery } from "./features/posts/postsSlice"

export default function App() {
  const {isLoading, isError, error, isSuccess} = useGetPostsQuery()
  const orderedPostIds = useSelector(selectPostIds)
  let content;
  if(isLoading){
    content = <p>Loading...</p>
  }else if (isSuccess){
    content = orderedPostIds.map(id => <p key={id}>{id}</p>)
  }else if(isError){
    content = <p>Error: {error.message}</p>
  }
  return (
    <h1 className="text-3xl font-bold underline">
      {content}
    </h1>
  )
}