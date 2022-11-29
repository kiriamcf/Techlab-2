import { Component, mergeProps } from 'solid-js'

interface Props {
  class?: string
}

const IconMachine: Component<Props> = (props) => {
  props = mergeProps({ class: 'w-full h-full' }, props)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384.154 384.154"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      class={props.class}>
      <g id="XMLID_999_">
        <g>
          <g>
            <path
              d="M334.154,259.41h-17.077v-37.863h-60v37.863h-49.25v-37.863h-60v37.863h-52.75V66.744h52.359
				c3.171,9.612,10.779,17.22,20.391,20.391v27.472h-8.664l-0.768,31.698l-34.104,22.839l22.054,31.178l16.328-11.551
				l-10.205-14.426l25.358-16.981l25.358,16.981l-10.205,14.426l16.328,11.551l22.055-31.178l-34.104-22.839l-0.768-31.698h-8.664
				V87.135c12.761-4.21,22-16.239,22-30.391c0-17.645-14.355-32-32-32c-14.153,0-26.181,9.239-30.391,22H95.077H72.494H30.077
				v216.818C12.395,271.276,0,288.919,0,309.41c0,27.57,22.43,50,50,50h284.154c27.57,0,50-22.43,50-50
				S361.725,259.41,334.154,259.41z M177.827,44.744c6.617,0,12,5.383,12,12s-5.383,12-12,12s-12-5.383-12-12
				S171.21,44.744,177.827,44.744z M277.077,241.547h20v17.863h-20V241.547z M167.827,241.547h20v17.863h-20V241.547z
				 M50.077,66.744h22.417h2.583V259.41h-25V66.744z M334.154,339.41H50c-16.542,0-30-13.458-30-30s13.458-30,30-30h284.154
				c16.542,0,30,13.458,30,30S350.696,339.41,334.154,339.41z"
            />
            <rect x="53.827" y="299.41" width="35.333" height="20" />
            <rect x="134.216" y="299.41" width="35.333" height="20" />
            <rect x="214.604" y="299.41" width="35.334" height="20" />
            <rect x="294.994" y="299.41" width="35.333" height="20" />
          </g>
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  )
}

export default IconMachine
