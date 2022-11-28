import { Component, Show } from 'solid-js'
import Card from './Card'
import { user } from '../signals/user'
import CardTitle from './CardTitle'
import IconIdentification from './Icons/Identification'
import IconEmail from './Icons/Email'
import IconCard from './Icons/Card'
import IconWarning from './Icons/Warning'
import InputText from '../components/InputText'
import Button from './Button'
import { axios } from '../Instances'

const AccountContent: Component = (props) => {
  const requestCard = async (event: Event) => {
    // event.preventDefault()

    const response = await axios.post('api/rfid_petitions')

    // turbo.mutate('/api/user', response.data.data)
  }

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Account</CardTitle>
        <div class="flex space-x-2">
          <div class="flex flex-col w-full">
            <span class="mb-1 inline-block">Name</span>
            <div class="flex">
              <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
                <IconIdentification class="h-6 w-6 text-black" />
              </div>
              <div class="bg-neutral-700 px-2 flex items-center w-full rounded-r">
                {user()?.()?.name}
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <span class="mb-1 inline-block">Surname</span>
            <div class="flex w-full">
              <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
                <IconIdentification class="h-6 w-6 text-black" />
              </div>
              <div class="bg-neutral-700 px-2 flex items-center w-full rounded-r">
                {user()?.()?.surname}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <span class="mb-1 inline-block">Email</span>
          <div class="flex w-full">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconEmail class="h-6 w-6 text-black" />
            </div>
            <div class="bg-neutral-700 px-2 flex items-center w-full rounded-r">
              {user()?.()?.email}
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <span class="mb-1 inline-block">RFID Card</span>
          <div class="flex w-full">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconCard class="h-6 w-6 text-black" />
            </div>
            <div class="bg-neutral-700 px-2 flex items-center w-full rounded-r">
              {user()?.()?.rfid_card}
            </div>
          </div>
        </div>
        <Show when={user()?.()?.rfid_card == '00 00 00 00'}>
          <div class="flex w-full bg-red-500 rounded select-none">
            <div class="flex items-center justify-center p-2">
              <IconWarning class="h-6 w-6 text-black" />
            </div>
            <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
              You need to request an RFID card in order to have access to the services we provide
            </div>
          </div>
          <Button variant="normal" onClick={requestCard}>
            Request rfid card
          </Button>
        </Show>
      </div>
    </Card>
  )
}

export default AccountContent
