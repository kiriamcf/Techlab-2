import { Component } from 'solid-js'
import { TurboContext, TurboSolidResourceOptions } from 'turbo-solid'
import { turbo } from './Instances'
import L from './L'

const P: Component = () => {
  return <L />
}

const A: Component = () => {
  const configuration: TurboSolidResourceOptions = {
    turbo,
    clearOnForget: true,
  }

  return (
    <TurboContext.Provider value={configuration}>
      <P />
    </TurboContext.Provider>
  )
}

export default A
