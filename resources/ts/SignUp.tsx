import { Component, createSignal } from 'solid-js'
import axios from 'axios'
import Layout from './Layout'
import Card from './components/Card'
import Button from './components/Button'
import CardTitle from './components/CardTitle'
import InputText from './components/InputText'
import InputEmail from './components/InputEmail'
import InputPassword from './components/InputPassword'

const SignUp: Component = () => {
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
  const createUser = () => {
    axios.post('api/signup', dataToSubmit()).then((response) => {
      console.log(response)
    })
  }

  return (
    <>
      <Layout>
        <main class="max-w-md mx-auto my-8">
          <Card>
            <div class="flex flex-col">
              <CardTitle>Sign up</CardTitle>
              <div class="flex flex-col my-4 gap-4">
                <div class="flex gap-2">
                  <div>
                    <span>Name</span>
                    <InputText
                      placeholder="Name"
                      value={name()}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <span>Surname</span>
                    <InputText
                      placeholder="Surname"
                      value={surname()}
                      onChange={(e) => setSurname(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div>
                  <span>Email</span>
                  <InputEmail
                    placeholder="Email"
                    value={email()}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <span>Password</span>
                  <InputPassword
                    placeholder="Password"
                    value={password()}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <span>Confirm Password</span>
                  <InputPassword
                    placeholder="Confirm Password"
                    value={confirmPassword()}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  />
                </div>
              </div>
              <Button onClick={createUser}>Sign up</Button>
            </div>
          </Card>
        </main>
      </Layout>
    </>
  )
}

export default SignUp