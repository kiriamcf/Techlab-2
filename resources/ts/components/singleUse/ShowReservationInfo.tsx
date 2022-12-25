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

  const activateMachine = () => {
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

    notify('Reservation deleted successfully')
  }

  return (
    <>
      <tr>
        <td>{dayjs(props.reservation.day).format('DD/MM/YY')}</td>
        <td>
          {props.reservation.hour} - {props.reservation.hour + 1}
        </td>
        <td>{props.reservation.laboratory_name}</td>
        <td>{props.reservation.machine_name}</td>
        <td>
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
