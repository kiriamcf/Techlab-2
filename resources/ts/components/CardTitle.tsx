import { ParentComponent } from 'solid-js'

interface Props {
  type?: 'normal' | 'margined'
}

const CardTitle: ParentComponent<Props> = (props) => {
  const classes = {
    normal: 'uppercase tracking-wider font-bold text-lg mt-0',
    margined: 'uppercase tracking-wider font-bold text-lg !mt-4',
  }

  return <h2 class={classes[props.type ?? 'normal']}>{props.children}</h2>
}

export default CardTitle
