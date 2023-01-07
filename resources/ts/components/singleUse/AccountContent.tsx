import { Component, createEffect, createSignal, onMount, Show, useContext } from 'solid-js'
import Card from '../Card'
import { user, setUser } from '../../signals/user'
import CardTitle from '../CardTitle'
import IconIdentification from '../Icons/Identification'
import IconEmail from '../Icons/Email'
import IconCard from '../Icons/Card'
import IconWarning from '../Icons/Warning'
import InputText from '../InputText'
import Button from '../Button'
import { axios, turbo } from '../../Instances'
import { NotificationContext } from './Notifications'
import InputPassword from '../InputPassword'
import IconPassword from '../Icons/Password'

const AccountContent: Component = (props) => {
  const { notify } = useContext(NotificationContext)

  const [isEditing, setIsEditing] = createSignal<boolean>(false)
  const [modifyName, setModifyName] = createSignal<string>()
  const [modifySurname, setModifySurname] = createSignal<string>()
  const [modifyEmail, setModifyEmail] = createSignal<string>()
  const [modifyPassword, setModifyPassword] = createSignal<string>()

  const editing = () => {
    setModifyName(user()?.()?.name)
    setModifySurname(user()?.()?.surname)
    setModifyEmail(user()?.()?.email)
    setModifyPassword('')
    setIsEditing(true)
  }

  const modifyUser = async () => {
    if (modifyName() === '' || modifySurname() === '' || modifyEmail() === undefined) {
      notify('You must fill in all fields!', 'error')
      return
    }

    if (modifyPassword() === '') {
      var response = await axios.put(`api/users/${user()?.()?.id}`, {
        name: modifyName(),
        surname: modifySurname(),
        email: modifyEmail(),
      })
    } else {
      var response = await axios.put(`api/users/${user()?.()?.id}`, {
        name: modifyName(),
        surname: modifySurname(),
        email: modifyEmail(),
        password: modifyPassword(),
      })
    }

    turbo.mutate('/api/user', response.data.data)

    setModifyName(undefined)
    setModifySurname(undefined)
    setModifyPassword(undefined)
    setModifyEmail(undefined)
    setIsEditing(false)
    notify('User modified successfully')
  }

  const requestCard = async () => {
    // event.preventDefault()

    const response = await axios.post('api/rfid_petitions')

    turbo.mutate('api/rfid_petitions', (old) => [...old, response.data.data])

    notify('RFID requested successfully')
  }

  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Account</CardTitle>
        <div class="flex flex-col md:flex-row space-x-0 md:space-x-2">
          <div class="flex flex-col w-full">
            <span class="mb-1 inline-block">Name</span>
            <div class="flex">
              <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
                <IconIdentification class="h-6 w-6 text-black" />
              </div>
              <Show
                when={isEditing()}
                fallback={
                  <InputText
                    placeholder="Name"
                    style="roundedRight"
                    value={user()?.()?.name}
                    disabled
                  />
                }>
                <InputText
                  placeholder="Name"
                  style="roundedRight"
                  value={modifyName()}
                  onChange={(e) => setModifyName(e.currentTarget.value)}
                />
              </Show>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <span class="mb-1 inline-block">Surname</span>
            <div class="flex w-full">
              <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
                <IconIdentification class="h-6 w-6 text-black" />
              </div>
              <Show
                when={isEditing()}
                fallback={
                  <InputText
                    placeholder="Name"
                    style="roundedRight"
                    value={user()?.()?.surname}
                    disabled
                  />
                }>
                <InputText
                  placeholder="Surname"
                  style="roundedRight"
                  value={modifySurname()}
                  onChange={(e) => setModifySurname(e.currentTarget.value)}
                />
              </Show>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <Show
            when={isEditing()}
            fallback={<span class="mb-1 inline-block">Password (Hashed)</span>}>
            <span class="mb-1 inline-block">New Password</span>
          </Show>
          <div class="flex w-full">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconPassword class="h-6 w-6 text-black" />
            </div>
            <Show
              when={isEditing()}
              fallback={
                <InputPassword
                  placeholder="Password"
                  style="roundedRight"
                  value={user()?.()?.password}
                  disabled
                />
              }>
              <InputPassword
                placeholder="Password"
                style="roundedRight"
                value={modifyPassword()}
                onChange={(e) => setModifyPassword(e.currentTarget.value)}
              />
            </Show>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <span class="mb-1 inline-block">Email</span>
          <div class="flex w-full">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconEmail class="h-6 w-6 text-black" />
            </div>
            <Show
              when={isEditing()}
              fallback={
                <InputText
                  placeholder="Email"
                  style="roundedRight"
                  value={user()?.()?.email}
                  disabled
                />
              }>
              <InputText
                placeholder="Email"
                style="roundedRight"
                value={modifyEmail()}
                onChange={(e) => setModifyEmail(e.currentTarget.value)}
              />
            </Show>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <span class="mb-1 inline-block">RFID Card</span>
          <div class="flex w-full">
            <div class="flex items-center justify-center bg-primary-500 p-2 rounded-l">
              <IconCard class="h-6 w-6 text-black" />
            </div>
            <Show
              when={isEditing()}
              fallback={
                <InputText
                  placeholder="Email"
                  style="roundedRight"
                  value={user()?.()?.rfid_card}
                  disabled
                />
              }>
              <InputText
                placeholder="Email"
                style="bgDisabledRoundedRight"
                value={user()?.()?.rfid_card}
                disabled
              />
            </Show>
          </div>
        </div>
        <Show when={user()?.()?.rfid_card == '00 00 00 00'}>
          <div class="flex w-full bg-red-500 rounded select-none justify-center">
            <div class="flex items-center justify-center p-2">
              <IconWarning class="h-6 w-6 text-black" />
            </div>
            <div class="p-2 flex items-center rounded-r text-black font-medium">
              You need to request an RFID card in order to have access to the services we provide
            </div>
          </div>
          <Button variant="normal" onClick={requestCard}>
            Request rfid card
          </Button>
        </Show>
        <Show
          when={isEditing()}
          fallback={
            <Button variant="normal" onClick={editing}>
              edit
            </Button>
          }>
          <Button variant="normal" onClick={modifyUser}>
            Submit
          </Button>
        </Show>
      </div>
    </Card>
  )
}

export default AccountContent
