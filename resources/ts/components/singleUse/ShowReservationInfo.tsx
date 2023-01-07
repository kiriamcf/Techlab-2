import dayjs from 'dayjs'
import { Component, Show, useContext } from 'solid-js'
import { createTurboResource } from 'turbo-solid'
import Machine from '../../contracts/machine'
import Reservation from '../../contracts/reservation'
import { axios, turbo } from '../../Instances'
import Button from '../Button'
import { NotificationContext } from './Notifications'

interface Props {
  reservation: Reservation
}

const ShowReservationInfo: Component<Props> = (props) => {
  const { notify } = useContext(NotificationContext)

  const [reservations, { mutate }] = createTurboResource<{
    activeReservations: Reservation[]
    unactiveReservations: Reservation[]
  }>(() => '/api/user/reservations')

  const [machine] = createTurboResource<Machine>(
    () => `/api/machines/${props.reservation.machine_id}`
  )

  const isCurrent = (day: string, hour: number) => {
    let today = new Date().toISOString().slice(0, 10)

    if (today !== dayjs(day).format('YYYY-MM-DD')) {
      return false
    }

    const d = new Date()
    let currentHour = d.getHours()

    if (currentHour !== hour) {
      return false
    }

    return true
  }

  const amIAuthorized = async (machine_id: number) => {
    const responseMachine = await axios.get(`/api/machines/${machine_id}`)
    if (responseMachine.data.data.url === null || responseMachine.data.data.url === '') {
      return true
    }
    const responseAuthorization = await axios.get(responseMachine.data.data.url)
    return responseAuthorization
  }

  const activateMachine = () => {
    if (!amIAuthorized(props.reservation.machine_id)) {
      notify('You are not authorized to do that')
      return
    }
    axios.put(`/api/machines/${props.reservation.machine_id}`, { active: true })

    turbo.mutate<Machine>(`/api/machines/${props.reservation.machine_id}`, (old) => ({
      ...old!,
      active: true,
    }))
    notify('Machine activated successfully')
  }

  const deactivateMachine = () => {
    axios.put(`/api/machines/${props.reservation.machine_id}`, { active: false })

    turbo.mutate<Machine>(`/api/machines/${props.reservation.machine_id}`, (old) => ({
      ...old!,
      active: false,
    }))
    notify('Machine deactivated successfully')
  }

  const deleteReservation = async () => {
    await axios.delete(`/api/reservations/${props.reservation.id}`)

    mutate((old) => ({
      activeReservations:
        old?.activeReservations.filter((reservation) => reservation.id != props.reservation.id) ??
        [],
      unactiveReservations: old?.unactiveReservations ?? [],
    }))

    let today = new Date().toISOString().slice(0, 10)
    turbo.query(`/api/machines/${props.reservation.machine_id}/reservations?date=${today}`, {
      fresh: true,
    })

    notify('Reservation deleted successfully')
  }

  return (
    <>
      <tr class="bg-zinc-800 dark:border-gray-700">
        <td class="py-4 px-6">{dayjs(props.reservation.day).format('DD/MM/YY')}</td>
        <td class="py-4 px-6">
          {props.reservation.hour} - {props.reservation.hour + 1}
        </td>
        <td class="py-4 px-6">{props.reservation.laboratory_name}</td>
        <td class="py-4 px-6">{props.reservation.machine_name}</td>
        <td class="py-4 px-6">
          <Show
            when={isCurrent(props.reservation.day, props.reservation.hour)}
            fallback={
              <Button
                onClick={() => {
                  deleteReservation()
                }}>
                Delete
              </Button>
            }>
            <Show
              when={machine()?.active}
              fallback={
                <Button
                  onClick={() => {
                    activateMachine()
                  }}>
                  Activate
                </Button>
              }>
              <Button
                onClick={() => {
                  deactivateMachine()
                }}>
                Deactivate
              </Button>
            </Show>
          </Show>
        </td>
      </tr>
    </>
  )
}

export default ShowReservationInfo
