'use client'

import { getAllCharacters } from '@/lib/requests'
import { Character, Filters } from '@/types'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { AxiosError } from 'axios'
import Title from '@/components/ui/Title'
import Card from '@/components/card/Card'
import Button from '@/components/ui/Button'
import FilterBar from '@/components/FilterBar'
import ModalDetails from '@/components/Modal'

function Characters() {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalData, setModalData] = useState<Character | null>(null)

  const [filters, setFilters] = useState<Filters>({
    name: '',
    species: '',
    type: '',
    status: '',
    gender: ''
  })

  const queryClient = useQueryClient()

  const { data, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['characters'],
      queryFn: ({ pageParam }) => getAllCharacters(pageParam, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.info.next && lastPage.info.page !== undefined) return lastPage.info.page + 1
        else return null
      }
    })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['characters'] })
  }, [filters, queryClient])

  function handleModalClose() {
    setIsModalOpened(false)
    setModalData(null)
  }

  function handleModalOpen(data: Character) {
    setModalData(data)
    setIsModalOpened(true)
  }

  if (status === 'pending') return <p>Loading...</p>

  return (
    <div className="flex flex-col items-center gap-6">
      <ModalDetails isOpen={isModalOpened} onClose={handleModalClose} character={modalData}/>
      <Title>RICK AND MORTY CHARACTERS</Title>
      <FilterBar isLoading={isFetching} filters={filters} onSubmit={(data) => setFilters(data)} />
      {error ? (
        (error as AxiosError).response?.status === 404 ? (
          <p>Nothing was found</p>
        ) : (
          <p>Something went wrong</p>
        )
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.results.map((character) => (
                <Card key={character.id} character={character} onButtonClick={() => handleModalOpen(character)}/>
              ))}
            </Fragment>
          ))}
          <Button
            className={cn(hasNextPage ? 'block' : 'hidden')}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default Characters
