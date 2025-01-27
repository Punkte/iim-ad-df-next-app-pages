import { Character, CharactersResult } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {
  data: CharactersResult
}
const Characters = ({data}: Props) => {
  const [results, setResults] = useState<CharactersResult>(data)
  const [characters, setCharacters] = useState<Character[]>(results.results)
  const loadNext = async () => {
    if (!results.info.next) return
    const req = await fetch(results.info.next)
    const res = await req.json() as CharactersResult

    setResults(res)
    setCharacters(c => ([...c, ...res.results]))
  }
  return (
    <>
      <div>Characters</div>
      <div className="grid grid-cols-6">
        {characters.map(({id, image, name}) => (
          <Link key={id} href={`/characters/${id}`}>
            <div className="card">
              <Image src={image} width={150} height={150} alt={name} />
              <p>{name}</p>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={loadNext} className="btn btn-blue bg-blue-600 p-4 rounded-md">Load more</button>
    </>
  )
}


export const getServerSideProps = async () => {
  const req = await fetch('https://rickandmortyapi.com/api/character')
  if(!req.ok) throw new Error('Error during fetch')
  const res = await req.json()

  return {
    props: {
      data: res
    }
  }

}

export default Characters