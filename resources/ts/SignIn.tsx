import { Component } from 'solid-js'
import Layout from './Layout'
import Card from './components/Card'
import Button from './components/Button'
import CardTitle from './components/CardTitle'
import InputText from './components/InputText'

const SignIn: Component = () => {
  return (
    <>
      <Layout>
        <main class="max-w-md mx-auto my-8">
          <Card>
            <div class="flex flex-col">
              <CardTitle>Login</CardTitle>
              <div class="flex flex-col my-4 gap-4">
                <div>
                  <span>Username</span>
                  <InputText placeholder="Username" />
                </div>
                <div>
                  <span>Password</span>
                  <InputText placeholder="Password" />
                </div>
              </div>
              <Button>Sign in</Button>
            </div>
          </Card>
        </main>
      </Layout>
    </>
  )
}

export default SignIn
