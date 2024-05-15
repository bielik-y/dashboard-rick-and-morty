interface TitleProps {
  children: string
}

function Title({ children }: TitleProps) {
  return <h1 className="text-5xl font-semibold text-slate-700">{children}</h1>
}

export default Title
