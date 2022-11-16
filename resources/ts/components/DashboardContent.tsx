import { Component } from 'solid-js'
import Card from './Card'
import { user } from '../signals/user'
import CardTitle from './CardTitle'

const DashboardContent: Component = () => {
  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Hello, {user()?.()?.name}</CardTitle>
        <h2>Welcome back!</h2>
      </div>
    </Card>
  )
}

export default DashboardContent
