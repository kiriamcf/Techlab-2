import { ParentComponent, JSX } from 'solid-js'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'faded' | 'noHover' | 'bordered' | 'hoverableBordered'
}

const Button: ParentComponent<Props> = (props) => {
  const classes = {
    normal:
      'uppercase bg-primary-500 py-2 px-6 rounded text-black font-semibold text-sm hover:bg-primary-600 flex items-center justify-center space-x-3 transition-colors',
    faded:
      'uppercase py-2 px-6 rounded text-white font-semibold text-sm hover:bg-primary-500 hover:text-black flex items-center justify-center space-x-3 transition-colors duration-500',
    noHover:
      'uppercase bg-primary-500 py-2 px-6 rounded text-black font-semibold text-sm flex items-center justify-center space-x-3',
    bordered:
      'uppercase bg-transparent py-2 px-6 rounded text-primary-500 border-2 border-primary-500 font-semibold text-sm flex items-center justify-center space-x-3',
    hoverableBordered:
      'uppercase bg-transparent py-2 px-6 rounded text-white border-2 border-transparent font-semibold text-sm flex items-center justify-center space-x-3 hover:border-primary-500 hover:text-primary-500 transition-colors duration-500',
  }

  return (
    <button {...props} class={classes[props.variant ?? 'normal']}>
      {props.children}
    </button>
  )
}

export default Button
