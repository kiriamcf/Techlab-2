import { Component, For, Show, Suspense } from 'solid-js'
import Layout from './components/Layout'
import Laboratory from './contracts/laboratory'
import Machine from './contracts/machine'
import { createTurboResource } from 'turbo-solid'

const Services: Component = () => {
  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratories')
  const [machines] = createTurboResource<Machine[]>(() => '/api/machines')

  return (
    <>
      <Layout>
        <div class="my-6 flex flex-col space-y-3 items-center px-6 lg:px-0">
          <h5
            class="text-6xl text-center text-primary-500 capitalize antialiased font-bold tracking-wide"
            id="laboratories">
            Laboratories
          </h5>

          <Suspense>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Show when={laboratories() != undefined && laboratories()?.length != 0}>
                <For each={laboratories()}>
                  {(laboratory, i) => (
                    <>
                      <div class="w-full p-6 shadow-2xl bg-neutral-800 rounded">
                        <h2 class="text-2xl text-center">{laboratory.name}</h2>
                        <div class="flex space-x-2 justify-center mt-2">
                          <span>University campus room:</span>
                          <span class="text-primary-500">{laboratory.room_number}</span>
                        </div>
                      </div>
                    </>
                  )}
                </For>
              </Show>
            </div>
          </Suspense>

          <h5
            class="text-6xl text-center text-primary-500 capitalize antialiased font-bold tracking-wide !mt-28"
            id="machines">
            Machines
          </h5>

          <Suspense>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Show when={machines() != undefined && machines()?.length != 0}>
                <For each={machines()}>
                  {(machine, i) => (
                    <>
                      <div class="w-full p-6 shadow-2xl bg-neutral-800 flex flex-col rounded">
                        <h2 class="text-2xl text-center">{machine.name}</h2>
                        <p class="text-center flex-grow mt-2">{machine.description}</p>
                        <div class="flex space-x-2 justify-center mt-2">
                          <span>Assigned at laboratory: </span>
                          <span class="text-primary-500">{machine.laboratory_name}</span>
                        </div>
                      </div>
                    </>
                  )}
                </For>
              </Show>
            </div>
          </Suspense>
        </div>
      </Layout>
    </>
  )
}

export default Services
