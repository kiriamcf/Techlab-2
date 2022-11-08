import { Component } from 'solid-js'
import Layout from './Layout'
import Card from './components/Card'
import Button from './components/Button'
import CardTitle from './components/CardTitle'
import InputText from './components/InputText'
import InputEmail from './components/InputEmail'

const SignUp: Component = () => {
  return (
    <>
      <Layout>
        <main class="max-w-md mx-auto my-8">
          <Card>
            <div class="flex flex-col">
              <CardTitle>Login</CardTitle>
              <div class="flex flex-col my-4 gap-4">
                <div class="flex gap-2">
                  <div>
                    <span>Name</span>
                    <InputText placeholder="Name" />
                  </div>
                  <div>
                    <span>Surname</span>
                    <InputText placeholder="Surname" />
                  </div>
                </div>
                <div>
                  <span>Username</span>
                  <InputText placeholder="Username" />
                </div>
                <div>
                  <span>Email</span>
                  <InputEmail />
                </div>
                <div>
                  <span>Password</span>
                  <InputText placeholder="Password" />
                </div>
                <div>
                  <span>Confirm Password</span>
                  <InputText placeholder="Confirm Password" />
                </div>
              </div>
              <Button>Sign up</Button>
            </div>
          </Card>
        </main>
      </Layout>
    </>
  )
}

export default SignUp
