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
import InputText from '../InputText'
import ShowReservationInfoResponsive from './ShowReservationInfoResponsive'

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
    <>
      <Card>
        <div class="flex flex-col space-y-3 w-full">
          <div class="flex justify-center md:justify-start">
            <CardTitle>Show reservations</CardTitle>
          </div>
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
                <h5 class="text-primary-500 uppercase text-center hidden md:block">
                  Active reservations
                </h5>
                <table class="w-full text-sm text-left text-gray-400 hidden md:table">
                  <thead class="text-xs uppercase bg-zinc-700 text-gray-400">
                    <tr>
                      <th class="py-3 px-6">Day</th>
                      <th class="py-3 px-6">Hour</th>
                      <th class="py-3 px-6">Laboratory</th>
                      <th class="py-3 px-6">Machine</th>
                      <th class="py-3 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <For each={reservations()?.activeReservations}>
                      {(reservation, i) => <ShowReservationInfo reservation={reservation} />}
                    </For>
                  </tbody>
                </table>
              </Show>
              <Show when={reservations()?.unactiveReservations.length !== 0}>
                <h5 class="text-primary-500 uppercase text-center hidden md:block">
                  Unactive reservations
                </h5>
                <table class="w-full text-sm text-left text-gray-400 hidden md:table">
                  <thead class="text-xs uppercase bg-zinc-700 text-gray-400">
                    <tr>
                      <th class="py-3 px-6">Day</th>
                      <th class="py-3 px-6">Hour</th>
                      <th class="py-3 px-6">Laboratory</th>
                      <th class="py-3 px-6">Machine</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <For each={reservations()?.unactiveReservations}>
                      {(reservation, i) => (
                        <>
                          <tr class="bg-zinc-800 dark:border-gray-700">
                            <td class="py-4 px-6">{dayjs(reservation.day).format('DD/MM/YY')}</td>
                            <td class="py-4 px-6">
                              {reservation.hour} - {reservation.hour + 1}
                            </td>
                            <td class="py-4 px-6">{reservation.laboratory_name}</td>
                            <td class="py-4 px-6">{reservation.machine_name}</td>
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
      <div class="mt-6">
        <Suspense>
          <Show
            when={
              reservations() !== undefined &&
              (reservations()?.activeReservations.length !== 0 ||
                reservations()?.unactiveReservations.length !== 0)
            }>
            <Show when={reservations()?.activeReservations.length !== 0}>
              <div class="rounded p-6 shadow-md bg-neutral-800 relative mx-6 md:hidden">
                <h5 class="text-primary-500 uppercase text-center md:hidden">
                  Active reservations
                </h5>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-6">
                <For each={reservations()?.activeReservations}>
                  {(reservation, i) => <ShowReservationInfoResponsive reservation={reservation} />}
                </For>
              </div>
            </Show>
            <Show when={reservations()?.unactiveReservations.length !== 0}>
              <div class="rounded p-6 shadow-md bg-neutral-800 relative mx-6 md:hidden">
                <h5 class="text-primary-500 uppercase text-center md:hidden">
                  Unactive reservations
                </h5>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-6">
                <For each={reservations()?.unactiveReservations}>
                  {(reservation, i) => (
                    <>
                      <Card grid="true">
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Day</span>
                          <InputText
                            placeholder="Reservation name"
                            value={dayjs(reservation.day).format('DD/MM/YY')}
                            disabled
                          />
                        </div>
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Hour</span>
                          <InputText
                            placeholder="Reservation hour"
                            value={[reservation.hour, reservation.hour + 1].join(' - ')}
                            // value={reservation.hour.toString()}
                            disabled
                          />
                        </div>
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Laboratory</span>
                          <InputText
                            placeholder="Reservation laboratory"
                            value={reservation.laboratory_name}
                            disabled
                          />
                        </div>
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Machine</span>
                          <InputText
                            placeholder="Reservation machine"
                            value={reservation.machine_name}
                            disabled
                          />
                        </div>
                      </Card>
                    </>
                  )}
                </For>
              </div>
            </Show>
          </Show>
        </Suspense>
      </div>
    </>
  )
}

export default ShowReservationContent
