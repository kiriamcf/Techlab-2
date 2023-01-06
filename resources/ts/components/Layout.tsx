import {
  createEffect,
  createMemo,
  Suspense,
  Match,
  ParentComponent,
  Show,
  Switch,
  useTransition,
  createSignal,
  onMount,
} from 'solid-js'
import Button from './Button'
import { A, useLocation, useNavigate } from '@solidjs/router'
import { axios, turbo } from '../Instances'
import { createTurboResource } from 'turbo-solid'
import User from '../contracts/user'
import { setUser } from '../signals/user'
import { Portal } from 'solid-js/web'
import IconBurger from './Icons/Burger'
import epsem from '../../assets/images/epsem.png'

interface Props {
  auth?: boolean
}

const Layout: ParentComponent<Props> = (props) => {
  const [currentYear, setCurrentYear] = createSignal<string>()
  const [openBurger, setOpenBurger] = createSignal(false)
  const [user] = createTurboResource<User>(() => '/api/user', {
    async fetcher(key, { signal }) {
      const response = await axios.get(key, { signal }).catch(() => undefined)
      return response?.data.data
    },
  })

  onMount(() => setCurrentYear(new Date().getFullYear().toString()))

  const toggleBurger = () => {
    setOpenBurger(!openBurger())
  }

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
      <header>
        <div class="flex flex-col">
          <div class="w-full bg-neutral-800 text-white p-6">
            <div class="max-w-5xl mx-auto flex justify-between content-center">
              <Switch fallback={<div>Not found</div>}>
                <Match when={!authenticated()}>
                  <A href="/">
                    <h5 class="uppercase text-2xl font-semibold">techlab</h5>
                  </A>
                </Match>
                <Match when={authenticated()}>
                  <A href="/dashboard">
                    <h5 class="uppercase text-2xl font-semibold">techlab</h5>
                  </A>
                </Match>
              </Switch>
              <div class="hidden md:flex items-center space-x-3">
                <h5 class="uppercase text-sm relative group">
                  <span>machines</span>
                  <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                  <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                </h5>
                <h5 class="uppercase text-sm relative group">
                  <span>laboratories</span>
                  <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                  <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
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
              <div
                class="md:hidden items-center space-x-3 flex content-center"
                onClick={() => toggleBurger()}>
                <div class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500">
                  <IconBurger class="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
          <Show when={openBurger()}>
            <div class="md:hidden w-full bg-stone-700 text-white p-6 pt-4">
              <div class="flex flex-wrap items-center justify-center">
                <h5 class="uppercase text-sm relative group pt-2 pr-3">
                  <span class="font-medium">machines</span>
                  <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                  <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                </h5>
                <h5 class="uppercase text-sm relative group pt-2 pr-3">
                  <span class="font-medium">laboratories</span>
                  <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                  <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all"></span>
                </h5>
                <div class="flex pt-2 pr-3">
                  <Switch fallback={<div>Not found</div>}>
                    <Match when={!authenticated()}>
                      <div class="pr-3">
                        <A href="/signin">
                          <Button>Sign in</Button>
                        </A>
                      </div>
                      <A href="/signup">
                        <Button>Sign up</Button>
                      </A>
                    </Match>
                    <Match when={authenticated()}>
                      <Button onClick={logout}>Sign out</Button>
                    </Match>
                  </Switch>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </header>
      <main class="w-full max-w-5xl mx-auto">{props.children}</main>
      <footer>
        <div class="flex flex-col">
          <div class="w-full bg-neutral-800 text-white p-4">
            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <div class="flex flex-row sm:flex-col space-x-2 items-center sm:space-x-0">
                <span class="tracking-wide">Contact</span>
                <span class="text-sm text-primary-500">contact@techlab.cat</span>
              </div>
              <div class="w-80">
                <img src={epsem} alt="epsem" class="w-full" />
              </div>
            </div>
            <h1 class="text-center text-gray-400 mt-2 sm:mt-0">
              © {currentYear()} Techlab. All rights reserved
            </h1>
          </div>
        </div>
      </footer>
    </Suspense>
  )
}

export default Layout
