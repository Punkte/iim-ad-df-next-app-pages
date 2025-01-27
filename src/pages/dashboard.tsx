import React from 'react'

export type TodoItem = {
  completed: boolean;
  id: number;
  title: string;
  userId: number
}

type Props = {
  data: TodoItem[]
}
const Dashboard = ({data}: Props) => {
  console.log(global.window)
  return (
    <>
      <div>Dashboard</div>
      <ul>
        {data.map(element => {
          return <li key={element.id}>{element.title}</li>
        })}
      </ul>
    </>
  )
}

export const getStaticProps = async () => {
  const req = await fetch('https://jsonplaceholder.typicode.com/todos')
  const res = await req.json()

  return {
    props: {
      data: res
    }
  }
}

export default Dashboard