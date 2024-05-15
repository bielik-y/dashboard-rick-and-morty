import { InputHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string
  options: {
    value: string
    label: string
  }[]
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, ...props }, ref) => {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={props.name}>{label}:</label>
      <select className='w-full cursor-pointer focus:outline-none focus:ring-1 focus:border-blue-400 bg-blue-50 hover:bg-blue-100 transition-color p-2 rounded-md' ref={ref} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select
