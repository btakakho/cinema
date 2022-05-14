interface IHeading {
  children?: string
  className?: string
}

export const Heading = ({ children, className }: IHeading) => {
  return (
    <h1
      className={`text-white text-opacity-80 font-semibold ${
        className?.includes('xl') ? '' : 'text-3xl'
      } ${className}`}
    >
      {children}
    </h1>
  )
}
