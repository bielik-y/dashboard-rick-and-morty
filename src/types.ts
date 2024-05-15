export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown'
}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown'
}

export type CharacterLocation = {
  name: string,
  url: string
}

export type Character = {
  id: string
  name: string
  status: Status
  species: string
  type: string
  gender: Gender,
  origin: CharacterLocation,
  location: CharacterLocation,
  episode: string[],
  image: string,
  url: string,
  created: string
}

export type CharactersResponse = {
  info: {
    count: number,
    next?: string,
    pages: number,
    prev?: string,
    page?: number
  },
  results: Character[]
}

export type Filters = {
  name: string,
  status: Status | ''
  species: string,
  type: string,
  gender: Gender | ''
}
