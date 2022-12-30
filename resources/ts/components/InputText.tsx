import { mergeProps, ParentComponent, JSX } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
  disabled?: boolean
  style?: 'normal' | 'roundedRight'
}

const InputText: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)

  const classes = {
    normal:
      'bg-neutral-700 h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600',
    roundedRight:
      'bg-neutral-700 h-10 w-full pl-2 rounded-r focus:outline-none focus:ring-2 focus:ring-primary-600',
  }

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class={classes[props.style ?? 'normal']}
      disabled={props.disabled}
    />
  )
}

export default InputText
