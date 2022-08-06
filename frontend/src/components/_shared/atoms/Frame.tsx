interface Props {
  children?: React.ReactNode,
  size?: keyof typeof maxWidthToClass,
}

const maxWidthToClass = {
  'xs': 'sm:max-w-xs',
  'sm': 'sm:max-w-sm',
  'md': 'sm:max-w-md',
  'lg': 'sm:max-w-lg',
  'xl': 'sm:max-w-xl',
  'xxl': 'sm:max-w-2xl',
}

const Frame = ({children, size = 'md' }: Props) => {
  return (
    <div className="h-full flex justify-center items-center p-4">
      <div className={`grow max-w-full ${maxWidthToClass[size]} pb-20`}>
        {children}
      </div>
    </div>
  )
}

export default Frame
