import { Component } from 'solid-js'
import Card from './Card'
import CardTitle from './CardTitle'

const ShowReservationContent: Component = (props) => {
  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Show reservations</CardTitle>
      </div>
    </Card>
  )
}

export default ShowReservationContent
