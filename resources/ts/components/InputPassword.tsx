import { JSX, mergeProps, ParentComponent } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
}

const InputPassword: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)
  return (
    <input
      type="password"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class="bg-neutral-700 h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
    />
  )
}

export default InputPassword
