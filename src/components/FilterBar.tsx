'use client'

import { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { Filters, Gender, Status } from '@/types'
import InputField from '@/components/ui/InputField'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

interface FilterBarProps {
  filters: Filters
  isLoading: boolean
  onSubmit: (data: Filters) => void
}

function FilterBar({ filters, onSubmit, isLoading = false }: FilterBarProps) {
  const { register, handleSubmit } = useForm<Filters>({
    defaultValues: filters
  })

  const genderSelectOptions = [
    { value: '', label: 'All' },
    { value: Gender.FEMALE, label: 'Female' },
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.GENDERLESS, label: 'Genderless' },
    { value: Gender.UNKNOWN, label: 'Unknown' }
  ]

  const statusSelectOptions = [
    { value: '', label: 'All' },
    { value: Status.ALIVE, label: 'Alive' },
    { value: Status.DEAD, label: 'Dead' },
    { value: Status.UNKNOWN, label: 'Unknown' }
  ]

  function preventEnterKeySubmission(e: KeyboardEvent<HTMLFormElement>) {
    const target = e.target
    if (e.key === 'Enter' && target instanceof HTMLInputElement) e.preventDefault()
  }

  function resetValues() {
    onSubmit({
      name: '',
      species: '',
      type: '',
      status: '',
      gender: ''
    })
  }

  return (
    <form
      className="mt-2 flex flex-col items-center gap-4"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={preventEnterKeySubmission}
    >
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <InputField label="Character Name" {...register('name')} />
          <InputField label="Species" {...register('species')} />
          <InputField label="Type" {...register('type')} />
        </div>
        <div className="flex flex-col gap-4">
          <Select label="Gender" options={genderSelectOptions} {...register('gender')} />
          <Select label="Status" options={statusSelectOptions} {...register('status')} />
          <Button type="reset" onClick={resetValues} className="self-center bg-blue-50 hover:bg-blue-100 transition-colors text-slate-800">
            Reset
          </Button>
        </div>
      </div>
      <Button type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : 'Apply filters'}
      </Button>
    </form>
  )
}

export default FilterBar
