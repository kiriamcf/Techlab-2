import { Component, createMemo, For, Show, Suspense } from 'solid-js'
import { createTurboResource } from 'turbo-solid'
import Reservation from '../../contracts/reservation'
import Button from '../Button'
import Card from '../Card'
import CardTitle from '../CardTitle'
import IconLoading from '../Icons/Loading'
import IconWarning from '../Icons/Warning'

const ShowReservationContent: Component = (props) => {
  const [reservations] = createTurboResource<Reservation[]>(() => '/api/user/reservations')

  createMemo(() => console.log(reservations()))

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Show reservations</CardTitle>
        <Suspense
          fallback={
            <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black">
              <IconLoading class="h-6 w-6 animate-spin text-white" />
              <span>Loading Reservations...</span>
            </div>
          }>
          <Show
            when={reservations() != undefined && reservations()?.length != 0}
            fallback={
              <div class="flex w-full bg-green-500 rounded select-none">
                <div class="flex items-center justify-center p-2">
                  <IconWarning class="h-6 w-6 text-black" />
                </div>
                <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                  You still haven't made any reservation
                </div>
              </div>
            }>
            <table class="table-auto border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th class="text-left">Day</th>
                  <th class="text-left">Hour</th>
                  <th class="text-left">Laboratory</th>
                  <th class="text-left">Machine</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <For each={reservations()}>
                  {(reservation, i) => (
                    <>
                      <tr>
                        <td>{reservation.day}</td>
                        <td>{reservation.hour}</td>
                        <td>{reservation.laboratory_name}</td>
                        <td>{reservation.machine_name}</td>
                        <td>
                          <Button onClick={() => {}}>Solve</Button>
                        </td>
                      </tr>
                    </>
                  )}
                </For>
              </tbody>
            </table>
          </Show>
        </Suspense>
      </div>
    </Card>
  )
}

export default ShowReservationContent
