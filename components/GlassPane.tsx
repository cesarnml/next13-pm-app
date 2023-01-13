import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
}

const GlassPane = ({ children, className }: Props) => {
  return <div className={clsx('glass border-solid border-2 border-gray-200', className)}>{children}</div>
}

export default GlassPane
