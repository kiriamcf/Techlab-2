import { Component, createEffect, createSignal, For, onCleanup, Show, Suspense } from 'solid-js'
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

  const [date, setDate] = createSignal<String>()
  const [activeLaboratory, setActiveLaboratory] = createSignal<Laboratory>()
  const [activeMachine, setActiveMachine] = createSignal<Machine>()
  const [ActiveButtonLaboratory, setActiveButtonLaboratory] = createSignal<Laboratory['name']>('')
  const [ActiveButtonMachine, setActiveButtonMachine] = createSignal<Machine['name']>('')

  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratory')
  const [machines] = createTurboResource<Machine[]>(() =>
    activeLaboratory() ? `/api/laboratory/${activeLaboratory()?.id}/machine` : null
  )
  // const [hours] = createTurboResource<Machine[]>(() =>
  //   date() ? `/api/laboratory/${activeLaboratory()?.id}/machine` : null
  // )

  createEffect(() => console.log(date()))

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Create reservation</CardTitle>
        <h5>Fill the following information:</h5>
        <div class="flex flex-col space-y-3">
          <span>Which date would you like to reserve?</span>
          <input
            ref={onRef}
            type="date"
            class="text-black rounded p-1 outline-none w-40"
            placeholder="Select a date"
            onChange={(e) => setDate(e.currentTarget.value)}
          />
          <Show when={date() !== undefined}>
            <span>Which laboratory do you prefer?</span>
            <div class="flex space-x-2">
              <Suspense fallback={<div>Loading Laboratories...</div>}>
                <For each={laboratories()} fallback={<div>Loading</div>}>
                  {(laboratory, i) => (
                    <Button
                      variant={
                        ActiveButtonLaboratory() == laboratory.name
                          ? 'bordered'
                          : 'hoverableBordered'
                      }
                      onClick={() => {
                        setActiveLaboratory(laboratory)
                        setActiveButtonLaboratory(laboratory.name)
                      }}>
                      {laboratory.name}
                    </Button>
                  )}
                </For>
              </Suspense>
            </div>
          </Show>
          <Show when={activeLaboratory() !== undefined}>
            <span>Select one of the available machines:</span>
            <div class="flex space-x-2">
              <Suspense fallback={<div>Loading Machines...</div>}>
                <For each={machines()} fallback={<div>Loading</div>}>
                  {(machine, i) => (
                    <Button
                      variant={
                        ActiveButtonMachine() == machine.name ? 'bordered' : 'hoverableBordered'
                      }
                      onClick={() => {
                        setActiveMachine(machine)
                        setActiveButtonMachine(machine.name)
                      }}>
                      {machine.name}
                    </Button>
                  )}
                </For>
              </Suspense>
            </div>
          </Show>
          <Show when={activeMachine() !== undefined}>
            <span>Select one of the available hours:</span>
            <Suspense fallback={<div>Loading Machines...</div>}>
              {/* <For each={machines()} fallback={<div>Loading</div>}>
                {(machine, i) => (
                  <Button
                    variant={
                      ActiveButtonMachine() == machine.name ? 'bordered' : 'hoverableBordered'
                    }
                    onClick={() => {
                      setActiveMachine(machine)
                      setActiveButtonMachine(machine.name)
                    }}>
                    {machine.name}
                  </Button>
                )}
              </For> */}
            </Suspense>
          </Show>
        </div>
      </div>
    </Card>
  )
}

export default CreateReservationContent
