import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { Chart, registerables } from 'chart.js'
import { getModeForResolutionAtIndex } from 'typescript'
Chart.register(...registerables)

interface Props {
  ref: any
  chartData?: { values: number[]; labels: string[] }
  updatedChartData?: { value: number; label: string }
}

const LineChart: Component<Props> = (props) => {
  let myDiv: any

  const [chart, setChart] = createSignal<any>()
  const [oldChartValues, setOldChartValues] = createSignal<number>(0)

  function removeData() {
    chart().data.labels.shift()
    chart().data.datasets.forEach((dataset: any) => {
      dataset.data.shift()
    })
    chart().update()
  }

  createEffect(() => {
    if (props.chartData === undefined) {
      return
    }
    const datasetLength = chart().data.datasets[0].data.length
    for (let i = 0; i < datasetLength; i++) {
      removeData()
    }
    for (let i = 0; i < props.chartData.values.length; i++) {
      chart().data.datasets.forEach((dataset: any) => {
        dataset.data.push(props.chartData?.values[i])
      })
    }
    for (let i = 0; i < props.chartData.labels.length; i++) {
      chart().data.labels.push(props.chartData.labels[i])
    }
    chart().update()
  })

  createEffect(() => {
    if (props.updatedChartData === undefined) {
      return
    }
    if (chart().data.datasets[0].data.length < 10) {
      chart().data.datasets.forEach((dataset: any) => {
        dataset.data.push(props.updatedChartData?.value)
      })
      chart().data.labels.push(props.updatedChartData.label)
      chart().update()
      return
    }
    removeData()
    chart().data.datasets.forEach((dataset: any) => {
      dataset.data.push(props.updatedChartData?.value)
    })
    chart().data.labels.push(props.updatedChartData.label)
    chart().update()
  })

  onMount(() => {
    setChart(
      new Chart(myDiv, {
        type: 'line',
        data: {
          labels: props.chartData?.labels,
          datasets: [
            {
              label: 'Consumption (A)',
              data: props.chartData?.values,
              borderWidth: 1,
              tension: 0.1,
              pointRadius: 5,
              pointHitRadius: 2,
              backgroundColor: 'rgb(234,179,5)',
              borderColor: 'rgb(234,179,5)',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    )
  })

  return <canvas ref={myDiv}></canvas>
}

export default LineChart
