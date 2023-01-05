import { JSX, mergeProps, ParentComponent } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
  style?: 'normal' | 'roundedRight' | 'bgDisabled' | 'bgDisabledRoundedRight'
  disabled?: boolean
}

const InputPassword: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)

  const classes = {
    normal:
      'bg-neutral-700 h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600',
    roundedRight:
      'bg-neutral-700 h-10 w-full pl-2 rounded-r focus:outline-none focus:ring-2 focus:ring-primary-600',
    bgDisabled:
      'bg-zinc-600 cursor-not-allowed h-10 w-full pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600',
    bgDisabledRoundedRight:
      'bg-zinc-600 cursor-not-allowed h-10 w-full pl-2 rounded-r focus:outline-none focus:ring-2 focus:ring-primary-600',
  }

  return (
    <input
      type="password"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      class={classes[props.style ?? 'normal']}
      disabled={props.disabled}
    />
  )
}

export default InputPassword
