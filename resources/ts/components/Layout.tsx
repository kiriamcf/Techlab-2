import {
  createEffect,
  createMemo,
  Suspense,
  Match,
  ParentComponent,
  Show,
  Switch,
  useTransition,
} from 'solid-js'
import Button from './Button'
import { A, useLocation, useNavigate } from '@solidjs/router'
import { axios, turbo } from '../Instances'
import { createTurboResource } from 'turbo-solid'
import User from '../contracts/user'
import { setUser } from '../signals/user'
import { Portal } from 'solid-js/web'
import IconBurger from './Icons/Burger'

interface Props {
  auth?: boolean
}

const Layout: ParentComponent<Props> = (props) => {
  const [user] = createTurboResource<User>(() => '/api/user', {
    async fetcher(key, { signal }) {
      const response = await axios.get(key, { signal }).catch(() => undefined)
      return response?.data.data
    },
  })

  createEffect(() => {
    setUser(() => user)
  })

  const location = useLocation()
  const navigate = useNavigate()
  // createEffect(() => console.log('user', user()))
  const authenticated = createMemo(() => user() !== undefined)
  // createEffect(() => console.log('authenticated', authenticated()))

  createEffect(() => {
    if (user.loading || props.auth === undefined) {
      return
    }
    if (props.auth === true && user() === undefined) {
      return navigate('/signin')
    }

    if (props.auth === false && user() !== undefined) {
      return navigate('/dashboard')
    }
  })

  const logout = async () => {
    await axios.post('/api/signout')
    // turbo.forget('/api/user')
    turbo.forget()
  }

  return (
    <Suspense
      fallback={
        <Portal>
          <div class="fixed inset-0 w-full h-full bg-transparent flex items-center justify-center">
            <div class="text-white">
              <span>Loading...</span>
            </div>
          </div>
        </Portal>
      }>
      <header class="w-full bg-neutral-800 text-white py-5">
        <div class="max-w-5xl mx-auto flex justify-between content-center">
          <Switch fallback={<div>Not found</div>}>
            <Match when={!authenticated()}>
              <A href="/">
                <h5 class="pl-6 lg:pl-0 uppercase text-2xl font-semibold">techlab</h5>
              </A>
            </Match>
            <Match when={authenticated()}>
              <A href="/dashboard">
                <h5 class="pl-6 lg:pl-0 uppercase text-2xl font-semibold">techlab</h5>
              </A>
            </Match>
          </Switch>
          <div class="hidden md:flex pr-6 lg:pr-0 items-center space-x-3">
            <h5 class="ml-4 uppercase text-sm relative group">
              <span>machines</span>
              <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
            </h5>
            <h5 class="ml-4 uppercase text-sm relative group">
              <span>laboratories</span>
              <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
            </h5>
            <Switch fallback={<div>Not found</div>}>
              <Match when={!authenticated()}>
                <A href="/signin">
                  <Button>Sign in</Button>
                </A>
                <A href="/signup">
                  <Button>Sign up</Button>
                </A>
              </Match>
              <Match when={authenticated()}>
                <Button onClick={logout}>Sign out</Button>
              </Match>
            </Switch>
          </div>
          <div class="md:hidden pr-6 items-center space-x-3 flex content-center">
            <div class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500">
              <IconBurger class="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
            </div>
          </div>
        </div>
      </header>
      <main class="w-full max-w-5xl mx-auto">{props.children}</main>
      <footer></footer>
    </Suspense>
  )
}

export default Layout
