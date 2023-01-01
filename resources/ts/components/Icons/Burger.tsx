import { Component, mergeProps } from 'solid-js'

interface Props {
  class?: string
}

const IconBurger: Component<Props> = (props) => {
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}

export default IconBurger
