import { GetStaticPaths, GetStaticProps } from "next"
import { TodoItem } from "../dashboard"
import { ParsedUrlQuery } from "querystring"

interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  data: TodoItem
}
const TodoPage = ({data}: Props) => {
  console.log(data)
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const req = await fetch('https://jsonplaceholder.typicode.com/todos')
  const res = await req.json() as TodoItem[]

  const paths = res.slice(0, 20).map((todo) => ({
    params: {id: `${todo.id}`}
  }))

  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
  const req = await fetch(`https://jsonplaceholder.typicode.com/todos/${params?.id}`)
  const res = await req.json()

  return {
    props: {
      data: res
    }
  }
}


export default TodoPage