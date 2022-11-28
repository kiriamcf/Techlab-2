import { mergeProps, ParentComponent, JSX } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
  disabled?: boolean
}

const InputText: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class="bg-neutral-700 placeholder-white h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      disabled={props.disabled}
      required
    />
  )
}

export default InputText
