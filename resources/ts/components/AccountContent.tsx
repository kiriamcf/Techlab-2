import { Component } from 'solid-js'
import Card from './Card'
import CardTitle from './CardTitle'

const AccountContent: Component = (props) => {
  return (
    <Card>
      <div class="flex flex-col space-y-3 w-full">
        <CardTitle>Account</CardTitle>
      </div>
    </Card>
  )
}

export default AccountContent
