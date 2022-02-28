import { useContext } from 'react'

import PostList from './PostsList'
import { UserContext } from 'components/Routing'

const Main = () => {
  const context = useContext(UserContext)

  return (
    <div className='App'>
      <PostList posts={context.postList} />
    </div>
  )
}

export default Main
