import { expandOptionals } from '@solidjs/router/dist/utils'
import { mergeProps, ParentComponent, JSX, For, Show } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  valueList?: string[]
  onChange?: JSX.EventHandlerUnion<HTMLSelectElement, Event>
  disabled?: boolean
}

const InputSelect: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)

  return (
    <select
      onChange={props.onChange}
      class="bg-neutral-700 border-r-8 border-transparent h-10 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600">
      {props.children}
    </select>
  )
}

export default InputSelect
