import { mergeProps, ParentComponent, JSX } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
}

const InputText: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class="text-black h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      required
    />
  )
}

export default InputText
