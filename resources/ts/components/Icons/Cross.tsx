import { Component, mergeProps } from 'solid-js'

interface Props {
  class?: string
}

const IconCross: Component<Props> = (props) => {
  props = mergeProps({ class: 'w-full h-full' }, props)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={props.class}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default IconCross
