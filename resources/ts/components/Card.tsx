import { ParentComponent } from 'solid-js'

const Card: ParentComponent = (props) => {
  return (
    <div class="rounded p-6 shadow-md bg-neutral-800 flex flex-col space-y-3 relative">
      {props.children}
    </div>
  )
}

export default Card
