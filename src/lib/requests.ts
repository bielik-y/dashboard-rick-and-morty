import { CharactersResponse, Filters } from '@/types'
import axios from 'axios'

export async function getAllCharacters(page: number, filters: Filters): Promise<CharactersResponse> {
  const params = { 
    page, 
    ...( filters.name!=='' && {name: filters.name}),
    ...( filters.species!=='' && {species: filters.species}),
    ...( filters.type!=='' && {type: filters.type}),
    ...( filters.gender!=='' && {gender: filters.gender}),
    ...( filters.status!=='' && {status: filters.status})
   }
  const { data } = await axios.get<CharactersResponse>(
    'https://rickandmortyapi.com/api/character',
    { params }
  )
  return {
    ...data,
    info: {
      ...data.info,
      page: page
    }
  }
}
