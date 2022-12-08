import { Component, For, Show, Suspense } from 'solid-js'
import Button from '../Button'
import Card from '../Card'
import CardTitle from '../CardTitle'
import IconLoading from '../Icons/Loading'
import IconWarning from '../Icons/Warning'

const ShowReservationContent: Component = (props) => {
  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Show reservations</CardTitle>
        <Suspense
          fallback={
            <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black">
              <IconLoading class="h-6 w-6 animate-spin text-white" />
              <span>Loading Reservations...</span>
            </div>
          }>
          {/* <Show
            when={petitions() != undefined && petitions()?.length != 0}
            fallback={
              <div class="flex w-full bg-green-500 rounded select-none">
                <div class="flex items-center justify-center p-2">
                  <IconWarning class="h-6 w-6 text-black" />
                </div>
                <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                  There are currently no petitions to solve
                </div>
              </div>
            }>
            <table class="table-auto border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Surname</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <For each={petitions()}>
                  {(petition, i) => (
                    <>
                      <Portal>
                        <Show when={activeUser() === petition.user_id}>
                          <div
                            class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                            onclick={(e) => closeModal(e)}>
                            <Card>
                              <div class="flex items-center space-x-2">
                                <span>Currently editing: </span>
                                <span class="text-primary-500">{petition.email}</span>
                              </div>
                              <div class="flex items-center space-x-2">
                                <span class="whitespace-nowrap">New RFID Card:</span>
                                <InputText
                                  placeholder="RFID Code"
                                  value={rfidCard()}
                                  onChange={(e) => setRfidCard(e.currentTarget.value)}
                                />
                              </div>
                              <Button onClick={() => solvePetition()}>send</Button>
                            </Card>
                          </div>
                        </Show>
                      </Portal>
                      <tr>
                        <td>{petition.user_id}</td>
                        <td>{petition.name}</td>
                        <td>{petition.surname}</td>
                        <td>{petition.email}</td>
                        <td>{petition.created_at}</td>
                        <td>
                          <Button
                            onClick={() => {
                              setActiveUser(petition.user_id), setActivePetition(petition.id)
                            }}>
                            Solve
                          </Button>
                        </td>
                      </tr>
                    </>
                  )}
                </For>
              </tbody>
            </table>
          </Show> */}
        </Suspense>
      </div>
    </Card>
  )
}

export default ShowReservationContent
