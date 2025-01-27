import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export type Character = {
  "id": number,
  "name": string,
  "status": string,
  "species": string,
  "type": string,
  "gender": string,
  "origin": {
    "name": string,
    "url": string
  },
  "location": {
    "name": string,
    "url": string
  },
  "image": string,
  "episode": string[],
  "url": string,
  "created": string
}

export type CharactersResult = {
  info: {count: number, next: string},
  results: Character[]
}
type Props = {
  data: CharactersResult
}
const Characters = ({data}: Props) => {
  const [characters, setCharacters] = useState<Character[]>(data.results)
  const [paginatedData, setPaginatedData] = useState(data)

  const loadNext = async () => {
    const req = await fetch(paginatedData.info.next);
    const res = await req.json() as CharactersResult

    setPaginatedData(res)
    setCharacters(list => ([...list, ...res.results]))
  }
  return (
    <>
      <div>Characters</div>
      <div className={'grid grid-cols-6'}>
        {characters.map(element => {
          return <Link key={element.id} href={`/rick/character/${element.id}`}>
            <div>
                <Image src={element.image} alt={element.name} width={150} height={150} />
                <p>{element.name}</p>
            </div>
          </Link>
        })}
      </div>
      <button onClick={loadNext}>load more</button>
    </>
  )
}

export const getServerSideProps = async () => {
  const req = await fetch('https://rickandmortyapi.com/api/character')
  const res = await req.json()

  return {
    props: {
      data: res
    }
  }
}

export default Characters