interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center p-6 mb-16">
      {children}
    </div>
  )
}

export default Container