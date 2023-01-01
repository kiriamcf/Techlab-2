import { ParentComponent } from 'solid-js'

interface Props {
  grid?: 'true' | 'false'
}

const Card: ParentComponent<Props> = (props) => {
  const classes = {
    true: 'rounded p-6 shadow-md bg-neutral-800 flex flex-col space-y-3 relative lg:mx-0',
    false: 'rounded p-6 shadow-md bg-neutral-800 flex flex-col space-y-3 relative mx-6 lg:mx-0',
  }

  return <div class={classes[props.grid ?? 'false']}>{props.children}</div>
}

export default Card
