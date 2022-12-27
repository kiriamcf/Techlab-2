import { Component, mergeProps } from 'solid-js'

interface Props {
  class?: string
}

const IconArrowLeft: Component<Props> = (props) => {
  props = mergeProps({ class: 'w-full h-full' }, props)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={props.class}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  )
}

export default IconArrowLeft
