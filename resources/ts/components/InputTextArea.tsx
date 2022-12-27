import { expandOptionals } from '@solidjs/router/dist/utils'
import { mergeProps, ParentComponent, JSX, For, Show } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
  disabled?: boolean
}

const InputTextArea: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)

  return (
    <textarea
      id="message"
      rows="4"
      class="block p-2 w-full bg-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
      placeholder="Machine description..."
      value={props.value}></textarea>
  )
}

export default InputTextArea
