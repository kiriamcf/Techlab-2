import { Component, createSignal, useContext } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import Button from './components/Button'
import CardTitle from './components/CardTitle'
import InputText from './components/InputText'
import InputPassword from './components/InputPassword'
import { axios, turbo } from './Instances'
import { createTurboResource } from 'turbo-solid'
import InputEmail from './components/InputEmail'
import { NotificationContext } from './components/singleUse/Notifications'

const SignIn: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const dataToSubmit = () => ({
    email: email(),
    password: password(),
  })

  const login = async (event: Event) => {
    event.preventDefault()

    if (email() === '' || password() === '') {
      notify('You must fill in all fields!', 'error')
      return
    }

    await axios.get('/sanctum/csrf-cookie')
    const response = await axios.post('api/signin', dataToSubmit())

    turbo.mutate('/api/user', response.data.data)

    notify('Signed in successfully!')
  }

  return (
    <>
      <Layout auth={false}>
        <div class="max-w-md mx-auto my-8">
          <Card>
            <form onSubmit={login} class="flex flex-col">
              <CardTitle>Sign In</CardTitle>
              <div class="flex flex-col my-4 gap-4">
                <div>
                  <span class="mb-1 inline-block">Email</span>
                  <InputEmail
                    placeholder="Email"
                    value={email()}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <span class="mb-1 inline-block">Password</span>
                  <InputPassword
                    placeholder="Password"
                    value={password()}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
              </div>
              <Button type="submit">Sign in</Button>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default SignIn
