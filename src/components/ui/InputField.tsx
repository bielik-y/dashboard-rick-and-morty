import { InputHTMLAttributes, forwardRef } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, ...props }, ref) => {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={props.name}>{label}:</label>
      <input className='flex-1 focus:outline-none focus:ring-1 focus:border-blue-400 bg-blue-50 p-2 rounded-md placeholder-slate-300' placeholder="Enter text" ref={ref} {...props} />
    </div>
  )
})

export default InputField