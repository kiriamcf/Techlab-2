import { Component } from 'solid-js'
import Card from './Card'
import CardTitle from './CardTitle'

const CreateReservationContent: Component = (props) => {
  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Create reservation</CardTitle>
      </div>
    </Card>
  )
}

export default CreateReservationContent
