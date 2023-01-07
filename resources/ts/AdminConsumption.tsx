import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
  Suspense,
  useContext,
} from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import IconLoading from './components/Icons/Loading'
import IconArrowLeft from './components/Icons/ArrowLeft'
import { A } from '@solidjs/router'
import { createTurboResource } from 'turbo-solid'
import Machine from './contracts/machine'
import IconWarning from './components/Icons/Warning'
import LineChart from './components/LineChart'
import { axios } from './Instances'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import dayjs from 'dayjs'

const AdminConsumption: Component = () => {
  const [machines] = createTurboResource<Machine[]>(() => '/api/machines')
  const [activeMachine, setActiveMachine] = createSignal<number>()

  const [chartData, setChartData] = createSignal<{ values: number[]; labels: string[] }>()
  const [updateChartData, setUpdateChartData] = createSignal<{ value: number; label: string }>()
  const [chartDataHistoric, setChartDataHistoric] = createSignal<{
    values: number[]
    labels: string[]
  }>()

  Pusher

  const E = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https' ? true : false,
  })

  const channel = E.channel('chart')
  channel.listen('.register', function (data: any) {
    valueRecieved(data)
  })

  const valueRecieved = (data: any) => {
    if (data.consumption.machine_id !== activeMachine()) {
      return
    }
    setUpdateChartData({
      value: data.consumption.value,
      label: dayjs(data.consumption.created_at).format('DD/MM/YY HH:mm'),
    })
  }

  onCleanup(() => channel.stopListening('.register'))

  const getDataset = async (machine_id: number) => {
    const response = await axios.get(`/api/machines/${machine_id}/consumptions`)
    const resValues = response.data.data.map((x: any) => x.value)
    const resLabels = response.data.data.map((x: any) =>
      dayjs(x.updated_at).format('DD/MM/YY HH:mm')
    )
    setChartData({ values: resValues, labels: resLabels })
  }

  const getDatasetHistoric = async (machine_id: number) => {
    const response = await axios.get(`/api/machines/${machine_id}/consumptions/historic`)
    var resValues = []
    for (let i = 5; i >= 1; i--) {
      if (response.data.data[i.toString().concat(' ', 'days ago')][1] === null) {
        resValues.push(0)
      } else {
        resValues.push(response.data.data[i.toString().concat(' ', 'days ago')][1])
      }
    }
    var resLabels = []
    resLabels.push(response.data.data['5 days ago'][0])
    resLabels.push(response.data.data['4 days ago'][0])
    resLabels.push(response.data.data['3 days ago'][0])
    resLabels.push(response.data.data['2 days ago'][0])
    resLabels.push(response.data.data['1 days ago'][0])
    setChartDataHistoric({ values: resValues, labels: resLabels })
  }

  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>Existing Machines</CardTitle>
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
                  <span>Loading Machines...</span>
                </div>
              }>
              <Show
                when={machines() != undefined && machines()?.length != 0}
                fallback={
                  <div class="flex w-full bg-green-500 rounded select-none">
                    <div class="flex items-center justify-center p-2">
                      <IconWarning class="h-6 w-6 text-black" />
                    </div>
                    <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                      There are currently no machines created
                    </div>
                  </div>
                }>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <For each={machines()}>
                    {(machine, i) => (
                      <div
                        class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 hover:text-primary-500 transition-colors duration-500 space-y-2 cursor-pointer"
                        onClick={() => (
                          setActiveMachine(machine.id),
                          getDataset(machine.id),
                          getDatasetHistoric(machine.id)
                        )}>
                        <div class="flex justify-between">
                          <span class="uppercase text-primary-500">{machine.name}</span>
                          <Show
                            when={machine.active}
                            fallback={
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-neutral-700"></span>
                            }>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            </span>
                          </Show>
                        </div>
                        <div>Laboratory: {machine.laboratory_name}</div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </Suspense>
            <Show when={activeMachine()}>
              <h5 class="text-primary-500 uppercase text-center !mt-6">Real time consumption</h5>
              <div class="!mt-6">
                <LineChart
                  ref={activeMachine()}
                  chartData={chartData()}
                  updatedChartData={updateChartData()}></LineChart>
              </div>
              <h5 class="text-primary-500 uppercase text-center !mt-6">Last 5 days</h5>
              <div class="!mt-6">
                <LineChart ref={activeMachine()} chartData={chartDataHistoric()}></LineChart>
              </div>
            </Show>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminConsumption
