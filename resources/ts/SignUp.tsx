import { Component, createSignal, useContext } from 'solid-js'
import axios from 'axios'
import Layout from './components/Layout'
import Card from './components/Card'
import Button from './components/Button'
import CardTitle from './components/CardTitle'
import InputText from './components/InputText'
import InputEmail from './components/InputEmail'
import InputPassword from './components/InputPassword'
import { NotificationContext } from './components/singleUse/Notifications'
import { turbo } from './Instances'

const SignUp: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [name, setName] = createSignal('')
  const [surname, setSurname] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [confirmPassword, setConfirmPassword] = createSignal('')
  const dataToSubmit = () => ({
    name: name(),
    surname: surname(),
    email: email(),
    password: password(),
    password_confirmation: confirmPassword(),
  })
  const createUser = async (event: Event) => {
    event.preventDefault()

    if (
      name() === '' ||
      surname() === '' ||
      email() === '' ||
      password() === '' ||
      confirmPassword() === ''
    ) {
      notify('You must fill in all fields!', 'error')
      return
    }
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('api/signup', dataToSubmit())

    turbo.mutate('/api/user', response.data.data)

    notify('Signed up successfully!')
  }

  return (
    <>
      <Layout auth={false}>
        <div class="max-w-md mx-auto my-8">
          <Card>
            <form onSubmit={createUser} class="flex flex-col">
              <CardTitle>Sign up</CardTitle>
              <div class="flex flex-col my-4 gap-4">
                <div class="flex gap-2">
                  <div>
                    <span class="mb-1 inline-block">Name</span>
                    <InputText
                      placeholder="Name"
                      value={name()}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <span class="mb-1 inline-block">Surname</span>
                    <InputText
                      placeholder="Surname"
                      value={surname()}
                      onChange={(e) => setSurname(e.currentTarget.value)}
                    />
                  </div>
                </div>
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
                <div>
                  <span class="mb-1 inline-block">Confirm Password</span>
                  <InputPassword
                    placeholder="Confirm Password"
                    value={confirmPassword()}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  />
                </div>
              </div>
              <Button type="submit">Sign up</Button>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default SignUp
