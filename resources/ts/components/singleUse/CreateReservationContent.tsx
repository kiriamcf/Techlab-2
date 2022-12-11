import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
  Suspense,
  useContext,
} from 'solid-js'
import Card from '../Card'
import CardTitle from '../CardTitle'
import flatpickr from 'flatpickr'
import Laboratory from '../../contracts/laboratory'
import Machine from '../../contracts/machine'
import 'flatpickr/dist/themes/dark.css'
import Button from '../Button'
import { createTurboResource } from 'turbo-solid'
import Reservation from '../../contracts/reservation'
import Hours from '../../contracts/hours'
import IconLoading from '../Icons/Loading'
import { axios, turbo } from '../../Instances'
import IconCalendar from '../Icons/Calendar'
import { NotificationContext } from './Notifications'

const CreateReservationContent: Component = (props) => {
  const { notify } = useContext(NotificationContext)
  const onRef = (element: HTMLInputElement) => {
    const fp = flatpickr(element, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today',
    })
    onCleanup(() => fp.destroy())
  }

  const [date, setDate] = createSignal<string>()
  const [activeLaboratory, setActiveLaboratory] = createSignal<Laboratory>()
  const [activeMachine, setActiveMachine] = createSignal<Machine>()
  const [activeHour, setActiveHour] = createSignal<number>(-1)
  const [hours] = createTurboResource<Hours>(() => '/api/get-available-hours')

  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratories')
  const [machines] = createTurboResource<Machine[]>(() =>
    activeLaboratory() ? `/api/laboratories/${activeLaboratory()?.id}/machines` : null
  )

  const [reservations] = createTurboResource<Reservation[]>(() => {
    const machine = activeMachine()
    const activeDate = date()

    if (!machine || !activeDate || activeDate === '') {
      return null
    }

    return `/api/machines/${machine.id}/reservations?date=${activeDate}`
  })

  const isReserved = (hour: number) => {
    const activeReservations = reservations()

    if (!activeReservations) {
      return undefined
    }

    for (let i = 0; i < activeReservations.length; i++) {
      if (activeReservations[i].hour === hour) {
        return true
      }
    }
    return false
  }

  const hourPassed = (hour: number) => {
    let today = new Date().toISOString().slice(0, 10)
    if (today === date()) {
      const d = new Date()
      let currentHour = d.getHours()
      if (hour < currentHour) {
        return true
      }
    }
    return false
  }

  const assignVariant = (hour: number) => {
    if (isReserved(hour) || hourPassed(hour)) {
      return 'reserved'
    }

    if (activeHour() === hour) {
      return 'bordered'
    }

    return 'hoverableBordered'
  }

  const dataToSubmit = () => ({
    hour: activeHour(),
    day: date(),
  })

  const create = async (event: Event) => {
    const response = await axios.post(
      `/api/machines/${activeMachine()?.id}/reservations`,
      dataToSubmit()
    )

    setDate(undefined)
    setActiveLaboratory(undefined)
    setActiveMachine(undefined)
    setActiveHour(-1)

    turbo.mutate(`/api/machines/${activeMachine()?.id}/reservations`, (old) => [
      ...(old ?? []),
      response.data.data,
    ])

    notify('Reservation created successfully')
  }

  createEffect(() => {
    date()

    setActiveLaboratory()
    setActiveMachine()
    setActiveHour(-1)
  })

  createEffect(() => {
    activeLaboratory()

    setActiveMachine()
    setActiveHour(-1)
  })

  createEffect(() => {
    activeMachine()

    setActiveHour(-1)
  })

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Create reservation</CardTitle>
        <h5>Fill the following information:</h5>
        <div class="flex flex-col space-y-3">
          <span>Which date would you like to reserve?</span>
          <div class="flex">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconCalendar class="h-6 w-6 text-black" />
            </div>
            <input
              ref={onRef}
              type="date"
              class="rounded-r p-2 outline-none w-fit bg-neutral-700 placeholder-white"
              placeholder="Select a date"
              onChange={(e) => setDate(e.currentTarget.value)}
            />
          </div>
          <Show when={date() !== undefined}>
            <span>Which laboratory do you prefer?</span>
            <div class="grid grid-cols-3 gap-2">
              <Suspense
                fallback={
                  <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black">
                    <IconLoading class="h-6 w-6 animate-spin text-white" />
                    <span>Loading Laboratories...</span>
                  </div>
                }>
                <For each={laboratories()}>
                  {(laboratory, i) => (
                    <Button
                      variant={
                        activeLaboratory()?.name == laboratory.name
                          ? 'bordered'
                          : 'hoverableBordered'
                      }
                      onClick={() => {
                        setActiveLaboratory(laboratory)
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
            <div class="grid grid-cols-4 gap-2">
              <Suspense
                fallback={
                  <div class="flex space-x-2 p-2 bg-primary-500 text-black rounded">
                    <IconLoading class="h-6 w-6 animate-spin" />
                    <span>Loading Machines...</span>
                  </div>
                }>
                <For each={machines()}>
                  {(machine, i) => (
                    <Button
                      variant={
                        activeMachine()?.name == machine.name ? 'bordered' : 'hoverableBordered'
                      }
                      onClick={() => {
                        setActiveMachine(machine)
                      }}>
                      {machine.name}
                    </Button>
                  )}
                </For>
              </Suspense>
            </div>
          </Show>
          <Show when={activeMachine() !== undefined && date() !== null}>
            <span>Select one of the available hours:</span>
            <div class="grid grid-cols-5 gap-2">
              <Suspense
                fallback={
                  <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black">
                    <IconLoading class="h-6 w-6 animate-spin" />
                    <span>Loading Hours...</span>
                  </div>
                }>
                <For each={hours()?.hours}>
                  {(hour, i) => (
                    <Button
                      variant={assignVariant(hour)}
                      disabled={isReserved(hour) || hourPassed(hour)}
                      onClick={() => {
                        setActiveHour(hour)
                      }}>
                      {hour} - {hour + 1}
                    </Button>
                  )}
                </For>
              </Suspense>
            </div>
          </Show>
          <Show when={activeMachine() !== undefined && date() !== null && activeHour() !== -1}>
            <Button variant="normal" onClick={create}>
              Submit
            </Button>
          </Show>
        </div>
      </div>
    </Card>
  )
}

export default CreateReservationContent
