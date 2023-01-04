import { Component, For, Show, Suspense } from 'solid-js'
import Card from '../Card'
import { user } from '../../signals/user'
import CardTitle from '../CardTitle'
import { createTurboResource } from 'turbo-solid'
import Event from '../../contracts/event'
import dayjs from 'dayjs'

const DashboardContent: Component = () => {
  const [events] = createTurboResource<Event[]>(() => '/api/events')

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
                <div class="p-4 rounded flex flex-col space-y-2 shadow-md bg-zinc-700">
                  <h3 class="uppercase">{event.title}</h3>
                  <span class="text-sm text-gray-400">
                    {dayjs(event.created_at).format('DD/MM/YY')}
                  </span>
                  <p>{event.description}</p>
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
