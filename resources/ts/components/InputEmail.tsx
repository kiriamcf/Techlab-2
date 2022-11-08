import { ParentComponent } from 'solid-js'

const InputEmail: ParentComponent = (props) => {
  return (
    // <button class="uppercase bg-primary-500 py-2 px-6 rounded text-black font-semibold text-sm hover:bg-primary-600 flex items-center space-x-3 transition-colors">
    //   {props.children}
    // </button>
    <input
      type="Email"
      placeholder="Email"
      class="text-black h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
    />
  )
}

export default InputEmail
