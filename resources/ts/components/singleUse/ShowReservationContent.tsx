import { Component, createMemo, For, Show, Suspense, useContext } from 'solid-js'
import { createTurboResource } from 'turbo-solid'
import Reservation from '../../contracts/reservation'
import Button from '../Button'
import Card from '../Card'
import CardTitle from '../CardTitle'
import IconLoading from '../Icons/Loading'
import IconWarning from '../Icons/Warning'
import dayjs from 'dayjs'
import { axios, turbo } from '../../Instances'
import { NotificationContext } from './Notifications'
import ShowReservationInfo from './ShowReservationInfo'

const ShowReservationContent: Component = (props) => {
  const { notify } = useContext(NotificationContext)

  const [reservations, { mutate }] = createTurboResource<{
    activeReservations: Reservation[]
    unactiveReservations: Reservation[]
  }>(() => '/api/user/reservations')

  const isMachineActive = async (machine_id: number) => {
    const response = await axios.get(`/api/machines/${machine_id}`)

    return response.data.data.actives
  }

  isMachineActive(1)

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Show reservations</CardTitle>
        <Suspense
          fallback={
            <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black justify-center">
              <IconLoading class="h-6 w-6 animate-spin text-black" />
              <span>Loading Reservations...</span>
            </div>
          }>
          <Show
            when={
              reservations() !== undefined &&
              (reservations()?.activeReservations.length !== 0 ||
                reservations()?.unactiveReservations.length !== 0)
            }
            fallback={
              <div class="flex w-full bg-green-500 rounded select-none justify-center">
                <div class="flex items-center justify-center p-2">
                  <IconWarning class="h-6 w-6 text-black" />
                </div>
                <div class="p-2 flex items-center rounded-r text-black font-medium">
                  You still haven't made any reservations
                </div>
              </div>
            }>
            <Show when={reservations()?.activeReservations.length !== 0}>
              <h5 class="text-primary-500 uppercase text-center">Active reservations</h5>
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
                  <For each={reservations()?.activeReservations}>
                    {(reservation, i) => <ShowReservationInfo reservation={reservation} />}
                  </For>
                </tbody>
              </table>
            </Show>
            <Show when={reservations()?.unactiveReservations.length !== 0}>
              <h5 class="text-primary-500 uppercase text-center">Unactive reservations</h5>
              <table class="table-auto border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th class="text-left">Day</th>
                    <th class="text-left">Hour</th>
                    <th class="text-left">Laboratory</th>
                    <th class="text-left">Machine</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={reservations()?.unactiveReservations}>
                    {(reservation, i) => (
                      <>
                        <tr>
                          <td>{dayjs(reservation.day).format('DD/MM/YY')}</td>
                          <td>
                            {reservation.hour} - {reservation.hour + 1}
                          </td>
                          <td>{reservation.laboratory_name}</td>
                          <td>{reservation.machine_name}</td>
                        </tr>
                      </>
                    )}
                  </For>
                </tbody>
              </table>
            </Show>
          </Show>
        </Suspense>
      </div>
    </Card>
  )
}

export default ShowReservationContent
