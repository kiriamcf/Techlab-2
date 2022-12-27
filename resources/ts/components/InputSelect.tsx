import { expandOptionals } from '@solidjs/router/dist/utils'
import { mergeProps, ParentComponent, JSX, For, Show } from 'solid-js'

interface Props {
  placeholder?: string
  value?: string
  valueList?: string[]
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>
  disabled?: boolean
}

const InputSelect: ParentComponent<Props> = (props) => {
  props = mergeProps({ placeholder: 'Enter placeholder' }, props)

  return (
    <select class="bg-neutral-700 border-r-8 border-transparent h-10 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600">
      <For each={props.valueList}>
        {(option, i) => (
          <Show when={option === props.value} fallback={<option value={option}>{option}</option>}>
            <option value={option} selected>
              {option}
            </option>
          </Show>
        )}
      </For>
    </select>
    // <input
    //   type="text"
    //   placeholder={props.placeholder}
    //   value={props.value}
    //   onChange={props.onChange}
    //   class={classes[props.style ?? 'normal']}
    //   disabled={props.disabled}
    //   required
    // />
  )
}

export default InputSelect
