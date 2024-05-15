import { cn } from '@/lib/utils'
import { Status } from '@/types'

interface StatusSpeciesProps {
  status: Status
  species: string
}

function StatusSpecies({ status, species }: StatusSpeciesProps) {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          'mr-2 h-2 w-2 rounded-full',
          status === Status.ALIVE && 'bg-emerald-500',
          status === Status.DEAD && 'bg-red-700',
          status === Status.UNKNOWN && 'bg-slate-400'
        )}
      />
      <div>{`${status[0].toUpperCase() + status.slice(1).toLowerCase()} - ${species}`}</div>
    </div>
  )
}

export default StatusSpecies
