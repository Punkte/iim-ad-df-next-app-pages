import { Character, CharactersResult } from "@/types"
import { GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"


type Props = {
  data: Character
}

interface Params extends ParsedUrlQuery {
  id: string
}

const CharacterPage = ({data: {image, name, episode}}: Props) => {
  console.log(episode)
  return (
    <>
      <div>CharacterPage</div>
      <div className="card">
        <Image src={image} width={150} height={150} alt={name} />
        <p>{name}</p>
        <ul>
          {episode.map(e => <li key={e}><a href={e} target="_blank" rel="noopener noreferrer">{e}</a></li>)}
        </ul>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
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