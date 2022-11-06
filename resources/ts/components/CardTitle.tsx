import { ParentComponent } from 'solid-js'

const CardTitle: ParentComponent = (props) => {
  return <h2 class="uppercase tracking-wider font-bold">{props.children}</h2>
}

export default CardTitle
