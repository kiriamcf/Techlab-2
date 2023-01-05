import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Show,
  Suspense,
  useContext,
} from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import { createTurboResource } from 'turbo-solid'
import IconLoading from './components/Icons/Loading'
import Button from './components/Button'
import User from './contracts/user'
import { user } from './signals/user'
import { axios, turbo } from './Instances'
import IconWarning from './components/Icons/Warning'
import { A } from '@solidjs/router'
import IconArrowLeft from './components/Icons/ArrowLeft'
import { NotificationContext } from './components/singleUse/Notifications'
import InputText from './components/InputText'
import { Portal } from 'solid-js/web'
import InputSelect from './components/InputSelect'

const AdminUser: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [users, { mutate }] = createTurboResource<{
    admins: User[]
    nonAdmins: User[]
  }>(() => '/api/users')
  const [activeUser, setActiveUser] = createSignal<number>()
  const [modifyAuthorization, setModifyAuthorization] = createSignal<number>()

  const closeModal = (e: Event) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      setActiveUser(undefined)
    }
  }

  const modifyUser = async () => {
    const auth = modifyAuthorization()
    if (auth === undefined) {
      return
    }
    const response = await axios.put(`/api/users/${activeUser()}`, {
      level_authorization: modifyAuthorization(),
    })

    turbo.mutate<User>(`/api/users/${activeUser()}`, (oldUser) => ({
      ...oldUser!,
      level_authorization: auth,
    }))

    turbo.query('/api/users', { fresh: true })

    setActiveUser(undefined)
    notify('User updated successfully')
  }

  const makeAdmin = async () => {
    const response = await axios.put(`/api/users/${activeUser()}`, { admin: true })

    mutate((old) => ({
      admins: [...(old?.admins ?? []), response.data.data] ?? [],
      nonAdmins: old?.nonAdmins.filter((user) => user.id != activeUser()) ?? [],
    }))
    turbo.mutate<User>(`/api/users/${activeUser()}`, (oldUser) => ({ ...oldUser!, admin: true }))

    setActiveUser(undefined)
    notify('User updated successfully')
  }

  const removeAdmin = async () => {
    const response = await axios.put(`/api/users/${activeUser()}`, { admin: false })

    mutate((old) => ({
      admins: old?.admins.filter((user) => user.id != activeUser()) ?? [],
      nonAdmins: [...(old?.nonAdmins ?? []), response.data.data] ?? [],
    }))
    turbo.mutate<User>(`/api/users/${activeUser()}`, (oldUser) => ({ ...oldUser!, admin: false }))

    setActiveUser(undefined)
    notify('User updated successfully')
  }

  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>User Management</CardTitle>
              <A href="/adminpanel">
                <div class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500">
                  <IconArrowLeft class="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
                </div>
              </A>
            </div>
            <Suspense
              fallback={
                <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black justify-center">
                  <IconLoading class="h-6 w-6 animate-spin text-black" />
                  <span>Loading Users...</span>
                </div>
              }>
              <Show
                when={
                  users() !== undefined &&
                  (users()?.admins.length !== 0 || users()?.nonAdmins.length !== 0)
                }
                fallback={
                  <div class="flex w-full bg-green-500 rounded select-none justify-center">
                    <div class="flex items-center justify-center p-2">
                      <IconWarning class="h-6 w-6 text-black" />
                    </div>
                    <div class="p-2 flex items-center rounded-r text-black font-medium">
                      There are currently no users
                    </div>
                  </div>
                }>
                <Show when={users()?.admins.length !== 0}>
                  <h5 class="text-primary-500 uppercase text-center hidden lg:block">Admins</h5>
                  <table class="w-full text-sm text-left text-gray-400 hidden lg:table">
                    <thead class="text-xs uppercase bg-zinc-700 text-gray-400">
                      <tr>
                        <th class="py-3 px-6">ID</th>
                        <th class="py-3 px-6">Name</th>
                        <th class="py-3 px-6">Surname</th>
                        <th class="py-3 px-6">Email</th>
                        <th class="py-3 px-6">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y">
                      <For each={users()?.admins}>
                        {(webUser, i) => (
                          <>
                            <Portal>
                              <Show when={activeUser() === webUser.id}>
                                <div
                                  class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                                  onclick={(e) => closeModal(e)}>
                                  <Card>
                                    <div class="flex items-center space-x-2">
                                      <span>Currently editing: </span>
                                      <span class="text-primary-500">{webUser.email}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                      <span class="whitespace-nowrap">
                                        New Authorization level:
                                      </span>
                                      <InputSelect
                                        placeholder="Select level"
                                        onChange={(e) =>
                                          setModifyAuthorization(Number(e.currentTarget.value))
                                        }>
                                        <For each={['0', '1', '2']}>
                                          {(option, i) => (
                                            <Show
                                              when={Number(option) === modifyAuthorization()}
                                              fallback={
                                                <option value={Number(option)}>{option}</option>
                                              }>
                                              <option value={Number(option)} selected>
                                                {option}
                                              </option>
                                            </Show>
                                          )}
                                        </For>
                                      </InputSelect>
                                    </div>
                                    <Show when={webUser.id != user()?.()?.id}>
                                      <Button
                                        onClick={() => {
                                          setActiveUser(webUser.id), removeAdmin()
                                        }}>
                                        Remove admin
                                      </Button>
                                    </Show>
                                    <Button onClick={() => modifyUser()}>update</Button>
                                  </Card>
                                </div>
                              </Show>
                            </Portal>
                            <tr class="bg-zinc-800 dark:border-gray-700">
                              <td class="py-4 px-6">{webUser.id}</td>
                              <td class="py-4 px-6">{webUser.name}</td>
                              <td class="py-4 px-6">{webUser.surname}</td>
                              <td class="py-4 px-6">{webUser.email}</td>
                              <td class="py-4 px-6">
                                <Button
                                  onClick={() => {
                                    setActiveUser(webUser.id),
                                      setModifyAuthorization(webUser.level_authorization)
                                  }}>
                                  Modify
                                </Button>
                              </td>
                            </tr>
                          </>
                        )}
                      </For>
                    </tbody>
                  </table>
                </Show>
                <Show when={users()?.nonAdmins.length !== 0}>
                  <h5 class="text-primary-500 uppercase text-center hidden lg:block">
                    Normal Users
                  </h5>
                  <table class="w-full text-sm text-left text-gray-400 hidden lg:table">
                    <thead class="text-xs uppercase bg-zinc-700 text-gray-400">
                      <tr>
                        <th class="py-3 px-6">ID</th>
                        <th class="py-3 px-6">Name</th>
                        <th class="py-3 px-6">Surname</th>
                        <th class="py-3 px-6">Email</th>
                        <th class="py-3 px-6">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y">
                      <For each={users()?.nonAdmins}>
                        {(webUser, i) => (
                          <>
                            <Portal>
                              <Show when={activeUser() === webUser.id}>
                                <div
                                  class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                                  onclick={(e) => closeModal(e)}>
                                  <Card>
                                    <div class="flex items-center space-x-2">
                                      <span>Currently editing: </span>
                                      <span class="text-primary-500">{webUser.email}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                      <span class="whitespace-nowrap">
                                        New Authorization level:
                                      </span>
                                      <InputSelect
                                        placeholder="Select level"
                                        onChange={(e) =>
                                          setModifyAuthorization(Number(e.currentTarget.value))
                                        }>
                                        <For each={['0', '1', '2']}>
                                          {(option, i) => (
                                            <Show
                                              when={Number(option) === modifyAuthorization()}
                                              fallback={
                                                <option value={Number(option)}>{option}</option>
                                              }>
                                              <option value={Number(option)} selected>
                                                {option}
                                              </option>
                                            </Show>
                                          )}
                                        </For>
                                      </InputSelect>
                                    </div>
                                    <Button
                                      onClick={() => {
                                        setActiveUser(webUser.id), makeAdmin()
                                      }}>
                                      Make admin
                                    </Button>
                                    <Button onClick={() => modifyUser()}>update</Button>
                                  </Card>
                                </div>
                              </Show>
                            </Portal>
                            <tr class="bg-zinc-800 dark:border-gray-700">
                              <td class="py-4 px-6">{webUser.id}</td>
                              <td class="py-4 px-6">{webUser.name}</td>
                              <td class="py-4 px-6">{webUser.surname}</td>
                              <td class="py-4 px-6">{webUser.email}</td>
                              <td class="py-4 px-6">
                                <Button
                                  onClick={() => {
                                    setActiveUser(webUser.id),
                                      setModifyAuthorization(webUser.level_authorization)
                                  }}>
                                  Modify
                                </Button>
                              </td>
                            </tr>
                          </>
                        )}
                      </For>
                    </tbody>
                  </table>
                </Show>
              </Show>
            </Suspense>
          </Card>
          <div class="mt-6">
            <Suspense>
              <Show
                when={
                  users() !== undefined &&
                  (users()?.admins.length !== 0 || users()?.nonAdmins.length !== 0)
                }>
                <Show when={users()?.admins.length !== 0}>
                  <div class="rounded p-6 shadow-md bg-neutral-800 relative mx-6 lg:hidden">
                    <h5 class="text-primary-500 uppercase text-center lg:hidden">admins</h5>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden p-6">
                    <For each={users()?.admins}>
                      {(webUser, i) => (
                        <>
                          <Portal>
                            <Show when={activeUser() === webUser.id}>
                              <div
                                class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                                onclick={(e) => closeModal(e)}>
                                <Card>
                                  <div class="flex items-center space-x-2">
                                    <span>Currently editing: </span>
                                    <span class="text-primary-500">{webUser.email}</span>
                                  </div>
                                  <div class="flex items-center space-x-2">
                                    <span class="whitespace-nowrap">New Authorization level:</span>
                                    <InputSelect
                                      placeholder="Select level"
                                      onChange={(e) =>
                                        setModifyAuthorization(Number(e.currentTarget.value))
                                      }>
                                      <For each={['0', '1', '2']}>
                                        {(option, i) => (
                                          <Show
                                            when={Number(option) === modifyAuthorization()}
                                            fallback={
                                              <option value={Number(option)}>{option}</option>
                                            }>
                                            <option value={Number(option)} selected>
                                              {option}
                                            </option>
                                          </Show>
                                        )}
                                      </For>
                                    </InputSelect>
                                  </div>
                                  <Show when={webUser.id != user()?.()?.id}>
                                    <Button
                                      onClick={() => {
                                        setActiveUser(webUser.id), removeAdmin()
                                      }}>
                                      Remove admin
                                    </Button>
                                  </Show>
                                  <Button onClick={() => modifyUser()}>update</Button>
                                </Card>
                              </div>
                            </Show>
                          </Portal>
                          <Card grid="true">
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">ID</span>
                              <InputText
                                placeholder="User ID"
                                value={webUser.id.toString()}
                                disabled
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Name</span>
                              <InputText placeholder="Name" value={webUser.name} disabled />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Surname</span>
                              <InputText
                                placeholder="Reservation laboratory"
                                value={webUser.surname}
                                disabled
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Email</span>
                              <InputText
                                placeholder="Reservation machine"
                                value={webUser.email}
                                disabled
                              />
                            </div>
                            <Button
                              onClick={() => {
                                setActiveUser(webUser.id),
                                  setModifyAuthorization(webUser.level_authorization)
                              }}>
                              Modify
                            </Button>
                          </Card>
                        </>
                      )}
                    </For>
                  </div>
                </Show>
                <Show when={users()?.nonAdmins.length !== 0}>
                  <div class="rounded p-6 shadow-md bg-neutral-800 relative mx-6 lg:hidden">
                    <h5 class="text-primary-500 uppercase text-center lg:hidden">normal users</h5>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden p-6">
                    <For each={users()?.nonAdmins}>
                      {(webUser, i) => (
                        <>
                          <Portal>
                            <Show when={activeUser() === webUser.id}>
                              <div
                                class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                                onclick={(e) => closeModal(e)}>
                                <Card>
                                  <div class="flex items-center space-x-2">
                                    <span>Currently editing: </span>
                                    <span class="text-primary-500">{webUser.email}</span>
                                  </div>
                                  <div class="flex items-center space-x-2">
                                    <span class="whitespace-nowrap">New Authorization level:</span>
                                    <InputSelect
                                      placeholder="Select level"
                                      onChange={(e) =>
                                        setModifyAuthorization(Number(e.currentTarget.value))
                                      }>
                                      <For each={['0', '1', '2']}>
                                        {(option, i) => (
                                          <Show
                                            when={Number(option) === modifyAuthorization()}
                                            fallback={
                                              <option value={Number(option)}>{option}</option>
                                            }>
                                            <option value={Number(option)} selected>
                                              {option}
                                            </option>
                                          </Show>
                                        )}
                                      </For>
                                    </InputSelect>
                                  </div>
                                  <Button
                                    onClick={() => {
                                      setActiveUser(webUser.id), makeAdmin()
                                    }}>
                                    Make admin
                                  </Button>
                                  <Button onClick={() => modifyUser()}>update</Button>
                                </Card>
                              </div>
                            </Show>
                          </Portal>
                          <Card grid="true">
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">ID</span>
                              <InputText
                                placeholder="User ID"
                                value={webUser.id.toString()}
                                disabled
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Name</span>
                              <InputText
                                placeholder="Name"
                                value={webUser.name}
                                // value={reservation.hour.toString()}
                                disabled
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Surname</span>
                              <InputText
                                placeholder="Reservation laboratory"
                                value={webUser.surname}
                                disabled
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <span class="mb-1 inline-block">Email</span>
                              <InputText
                                placeholder="Reservation machine"
                                value={webUser.email}
                                disabled
                              />
                            </div>
                            <Button
                              onClick={() => {
                                setActiveUser(webUser.id),
                                  setModifyAuthorization(webUser.level_authorization)
                              }}>
                              Modify
                            </Button>
                          </Card>
                        </>
                      )}
                    </For>
                  </div>
                </Show>
              </Show>
            </Suspense>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AdminUser
