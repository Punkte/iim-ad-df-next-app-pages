import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Character, CharactersResult } from "@/pages/rick"

interface Params extends ParsedUrlQuery {
  id: string
}

interface Props {
  data: Character
}
const CharacterPage = ({data}: Props) => {
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const req = await fetch('https://rickandmortyapi.com/api/character')
  const res = await req.json() as CharactersResult

  const paths = res.results.map((character) => ({
    params: {id: `${character.id}`}
  }))

  return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
  const req = await fetch(`https://rickandmortyapi.com/api/character/${params?.id}`)
  const res = await req.json() as Character

  return {
    props: {
      data: res
    }
  }
}


export default CharacterPage