import { Component, createEffect, createSignal, For, onCleanup, Show } from 'solid-js'
import Card from './Card'
import CardTitle from './CardTitle'
import flatpickr from 'flatpickr'
import Laboratory from '../contracts/laboratory'
import Machine from '../contracts/machine'
import 'flatpickr/dist/themes/dark.css'
import Button from './Button'
import { createTurboResource } from 'turbo-solid'

const CreateReservationContent: Component = (props) => {
  const onRef = (element: HTMLInputElement) => {
    const fp = flatpickr(element, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today',
    })
    onCleanup(() => fp.destroy())
  }

  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratory')
  const [activeLaboratory, setActiveLaboratory] = createSignal<Laboratory>()
  const [ActiveButtonLaboratory, setActiveButtonLaboratory] = createSignal<Laboratory['name']>('')

  const [machines] = createTurboResource<Machine[]>(() =>
    activeLaboratory() ? `/api/laboratory/${activeLaboratory()?.id}/machine` : null
  )
  createEffect(() => {
    console.log('machines', machines())
  })

  // createEffect(() => console.log(laboratories()))

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Create reservation</CardTitle>
        <h5>Fill the following information:</h5>
        <div class="flex flex-col">
          <span>Which date would you like to reserve?</span>
          <input
            ref={onRef}
            type="date"
            class="text-black rounded p-1 outline-none w-40 mt-2"
            placeholder="Select a date"
          />
        </div>
        <div class="flex flex-col">
          <span>Which laboratory do you prefer?</span>
          <div class="flex space-x-2 mt-2">
            <For each={laboratories()} fallback={<div>Loading</div>}>
              {(laboratory, i) => (
                // <Button
                //   variant="faded"
                //   onClick={() => {
                //     setActiveLaboratory(laboratory)
                //     setActiveButtonLaboratory(laboratory.name)
                //   }}>
                //   {laboratory.name}
                // </Button>

                <Show
                  when={ActiveButtonLaboratory() == laboratory.name}
                  fallback={
                    <Button
                      variant="faded"
                      onClick={() => {
                        setActiveLaboratory(laboratory)
                        setActiveButtonLaboratory(laboratory.name)
                      }}>
                      {laboratory.name}
                    </Button>
                  }>
                  <Button variant="noHover">
                    <span class="whitespace-nowrap">{laboratory.name}</span>
                  </Button>
                </Show>
              )}
            </For>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CreateReservationContent
