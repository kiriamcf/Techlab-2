import { Component, createSignal, Show, useContext } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import Button from './components/Button'
import InputText from './components/InputText'
import { axios, turbo } from './Instances'
import { A } from '@solidjs/router'
import IconArrowLeft from './components/Icons/ArrowLeft'
import { NotificationContext } from './components/singleUse/Notifications'
import InputTextArea from './components/InputTextArea'
import Event from './contracts/event'

const AdminEvent: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [title, setTitle] = createSignal('')
  const [description, setDescription] = createSignal('')

  const createEvent = async () => {
    if (title() === '' || description() === '') {
      notify('You must fill in all fields!', 'error')
      return
    }

    if (description().length > 255) {
      notify('You must not exceed character limits!', 'error')
      return
    }

    const response = await axios.post(`/api/events`, {
      title: title(),
      description: description(),
    })

    turbo.mutate<Event[]>('/api/events', (old) => [...(old ?? []), response.data.data])

    setTitle('')
    setDescription('')

    notify('Event created successfully')
  }

  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>Create Event</CardTitle>
              <A href="/adminpanel">
                <div class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500">
                  <IconArrowLeft class="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
                </div>
              </A>
            </div>
            <div class="flex flex-col w-full">
              <span class="mb-1 inline-block">Title</span>
              <InputText
                placeholder="Event title"
                value={title()}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
            <div class="flex flex-col w-full">
              <div class="flex space-x-2 mb-1">
                <span class="inline-block">Description </span>
                <Show
                  when={description().length > 255}
                  fallback={<span class="inline-block">({description().length}/255)</span>}>
                  <span class="inline-block text-red-500">({description().length}/255)</span>
                </Show>
              </div>
              <InputTextArea
                placeholder="Event description..."
                value={description()}
                rows={5}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
            <Button onClick={() => createEvent()}>create event</Button>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminEvent
