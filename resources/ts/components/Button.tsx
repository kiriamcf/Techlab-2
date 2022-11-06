import { ParentComponent } from 'solid-js'

const Button: ParentComponent = (props) => {
  return (
    <button class="uppercase bg-primary-500 py-2 px-6 rounded text-black font-semibold text-sm hover:bg-primary-600 flex items-center space-x-3 transition-colors">
      {props.children}
    </button>
  )
}

export default Button
