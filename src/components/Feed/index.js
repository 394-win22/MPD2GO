import { useContext } from 'react'

import PostList from './PostsList'
import { UserContext } from 'components/LoggedIn'

const Main = () => {
  const context = useContext(UserContext)

  return (
    <div className='App'>
      <PostList posts={context.postList} />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Main
