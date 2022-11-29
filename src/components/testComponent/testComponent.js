import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {testFetchPosts} from "../../store/actions/actions";
import style from '../../styles/testComponent.module.scss'

export const TestComponent = () => {
  const dispatch = useDispatch()
  const {posts, isLoading, error} = useSelector(state => state.postsReducer)

  useEffect(
    () => {
      dispatch(testFetchPosts())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div className={style.test}>
      {isLoading && <h1>Loading...</h1>}
      {!!error && <h1>{error}</h1>}
      {
        !!posts.length &&
                <div>{posts.map(({id, title}) => <div key={id}>{title}</div>)}</div>
      }
    </div>
  )
}