import { ParentComponent } from 'solid-js'

interface Props {
  onClick?: () => void
}

const Button: ParentComponent<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class="uppercase py-2 px-6 rounded text-white font-semibold text-sm hover:bg-primary-500 hover:text-black flex items-center justify-center space-x-3 transition-colors duration-500">
      {props.children}
    </button>
  )
}

export default Button
