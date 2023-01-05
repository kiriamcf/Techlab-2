import { Component, createSignal, For, Show, Suspense, useContext } from 'solid-js'
import Card from '../Card'
import { user } from '../../signals/user'
import CardTitle from '../CardTitle'
import { createTurboResource } from 'turbo-solid'
import AdminEvent from '../../contracts/event'
import dayjs from 'dayjs'
import IconTrash from '../Icons/Trash'
import Button from '../Button'
import { Portal } from 'solid-js/web'
import { axios, turbo } from '../../Instances'
import { NotificationContext } from './Notifications'

const DashboardContent: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [events] = createTurboResource<AdminEvent[]>(() => '/api/events')
  const [activeEvent, setActiveEvent] = createSignal()

  const closeModal = (e: Event) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      setActiveEvent(undefined)
    }
  }

  const deleteEvent = async () => {
    await axios.delete(`/api/events/${activeEvent()}`)

    turbo.query('/api/events', { fresh: true })

    setActiveEvent(undefined)
    notify('Event deleted successfully!')
  }

  return (
    <Card>
      <CardTitle>Hello, {user()?.()?.name}</CardTitle>
      <h2>Welcome back!</h2>
      <Suspense>
        <Show when={events() != undefined && events()?.length != 0}>
          <span>Here's some events that you might have missed: </span>
          <For each={events()}>
            {(event, i) => (
              <>
                <Portal>
                  <Show when={activeEvent() === event.id}>
                    <div
                      class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                      onclick={(e) => closeModal(e)}>
                      <div class="w-96 mx-4 overflow-y-scroll">
                        <Card>
                          <form action="">
                            <div class="flex flex-col space-y-3 w-full">
                              Are you sure you want to delete thie event?
                              <Button
                                variant="bgRed"
                                onClick={() => {
                                  deleteEvent()
                                }}>
                                Delete
                              </Button>
                            </div>
                          </form>
                        </Card>
                      </div>
                    </div>
                  </Show>
                </Portal>
                <div class="p-4 rounded flex flex-col space-y-2 shadow-md bg-zinc-700 relative">
                  <h3 class="uppercase">{event.title}</h3>
                  <span class="text-sm text-gray-400">
                    {dayjs(event.created_at).format('DD/MM/YY')}
                  </span>
                  <p>{event.description}</p>
                  <div
                    class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500 absolute top-2 right-4"
                    onClick={() => setActiveEvent(event.id)}>
                    <IconTrash class="h-5 w-5 text-white group-hover:text-black transition-colors duration-500" />
                  </div>
                </div>
              </>
            )}
          </For>
        </Show>
      </Suspense>
    </Card>
  )
}

export default DashboardContent
