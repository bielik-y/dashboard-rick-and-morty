import { Character } from '@/types'
import Image from 'next/image'
import StatusSpecies from '@/components/card/StatusSpecies'
import Button from '@/components/ui/Button'

interface CardProps {
  character: Character
  onButtonClick: () => void
}

function Card({ character, onButtonClick }: CardProps) {
  return (
    <div className=' cursor-pointer flex border border-slate-100 shadow-md rounded-md overflow-hidden lg:w-[530px] max-h-[240px] hover:border-emerald-600 hover:shadow-lg transition-all' onClick={onButtonClick}>
      <Image src={character.image} alt={character.name} width={200} height={200} />
      <div className='p-4 w-full flex flex-col justify-between'>
        <div>
        <span className='text-slate-800 font-semibold text-lg'>{character.name}</span>
        <StatusSpecies status={character.status} species={character.species} />
        {character.type && <span>{`(${character.type})`}</span>}
        <p>{`Gender: ${character.gender}`}</p>
        </div>
        <div className='flex w-full justify-end'>
          <Button variant='outlined' className='w-fit' onClick={onButtonClick}>Details</Button>
        </div>
      </div>
    </div>
  )
}

export default Card
