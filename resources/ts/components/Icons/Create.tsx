import { Component, mergeProps } from 'solid-js'

interface Props {
  class?: string
}

const IconCreate: Component<Props> = (props) => {
  props = mergeProps({ class: 'w-full h-full' }, props)
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke-width="1.5"
    //   stroke="currentColor"
    //   class={props.class}>
    //   <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class={props.class}>
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
        clip-rule="evenodd"
      />
    </svg>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke-width="1.5"
    //   stroke="currentColor"
    //   class={props.class}>
    //   <path
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //     d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    //   />
    // </svg>
  )
}

export default IconCreate
