'use client'

import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { Character } from '@/types'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import ReactDOM from 'react-dom'
import Button from './ui/Button'
import StatusSpecies from './card/StatusSpecies'
import Image from 'next/image'

interface ModalDetailsProps {
  isOpen: boolean
  character: Character | null
  onClose: () => void
}

function ModalDetails({ isOpen, character, onClose }: ModalDetailsProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useOnClickOutside(isOpen, modalRef, (e: Event) => {
    if (!buttonRef.current?.contains(e.target as Node)) {
      onClose()
    }
  })

  const modalContent = (
    <div
      className={cn(
        'fixed left-0 top-0 h-full w-full bg-slate-500 bg-opacity-50 backdrop-blur-[2px]',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div ref={modalRef} className="m-2 max-w-[700px] rounded-md bg-white p-4">
          {character && (
            <div className="flex w-full flex-col p-4">
              <Image  className='rounded-md mb-2' src={character.image} alt={character.name} width={200} height={200} />
              <div className="flex w-full flex-col justify-between">
                <span className="text-lg font-semibold text-slate-800">{character.name}</span>
                <StatusSpecies status={character.status} species={character.species} />
                {character.type && <span>{`(${character.type})`}</span>}
                <p>{`Gender: ${character.gender}`}</p>
                <div>
                  <span className="font-semibold">Last known location: </span>
                  <span>{character.location.name}</span>
                </div>
                <div>
                  <span className="font-semibold">First seen in: </span>
                  <span>{character.origin.name}</span>
                </div>
                <div className="flex w-full justify-end mt-4">
                  <Button ref={buttonRef} onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement)
}

export default ModalDetails
