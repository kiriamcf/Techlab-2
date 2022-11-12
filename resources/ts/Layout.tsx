import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  ParentComponent,
  Show,
  Switch,
} from 'solid-js'
import Button from './components/Button'
import { A, useLocation, useNavigate } from '@solidjs/router'
import { axios, turbo } from './Instances'
import { createTurboResource } from 'turbo-solid'
import User from './contracts/user'
import { setUser } from './signals/user'

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
    setUser(user())
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
    turbo.forget('/api/user')
  }

  return (
    <Show when={user.loading === false}>
      <header class="w-full bg-neutral-800 text-white py-5">
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
          <div class="flex items-center space-x-3">
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
        </div>
      </header>
      {props.children}
      <footer></footer>
    </Show>
  )
}

export default Layout

// const Layout: ParentComponent = (props) => {
//   const [axiosResponse, setAxiosResponse] = createSignal('')

//   axios.get('api/user').then((response) => {
//     if (response.data == 'User not logged in') {
//       setAxiosResponse('Not logged in')
//     } else {
//       setAxiosResponse('Logged in')
//     }
//   })
//   return (
//     <>
//       <Show when={axiosResponse() == 'Not logged in'} fallback={<div>Loading...</div>}>
//         <header class="w-full bg-neutral-800 text-white py-5">
//           <div class="max-w-5xl mx-auto flex justify-between content-center">
//             <A href="/">
//               <h5 class="uppercase text-2xl font-semibold">techlab</h5>
//             </A>
//             <div class="flex items-center space-x-3">
//               <h5 class="ml-4 uppercase text-sm relative group">
//                 <span>machines</span>
//                 <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//                 <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//               </h5>
//               <h5 class="ml-4 uppercase text-sm relative group">
//                 <span>laboratories</span>
//                 <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//                 <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//               </h5>
//               <A href="/signin">
//                 <Button>Sign in</Button>
//               </A>
//               <A href="/signup">
//                 <Button>Sign up</Button>
//               </A>
//             </div>
//           </div>
//         </header>
//         {props.children}
//         <footer></footer>
//       </Show>
//       <Show when={axiosResponse() == 'Logged in'} fallback={<div>Loading...</div>}>
//         <header class="w-full bg-neutral-800 text-white py-5">
//           <div class="max-w-5xl mx-auto flex justify-between content-center">
//             <A href="/">
//               <h5 class="uppercase text-2xl font-semibold">techlab</h5>
//             </A>
//             <div class="flex items-center space-x-3">
//               <h5 class="ml-4 uppercase text-sm relative group">
//                 <span>fuck</span>
//                 <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//                 <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//               </h5>
//               <h5 class="ml-4 uppercase text-sm relative group">
//                 <span>you</span>
//                 <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//                 <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-300 group-hover:w-1/2 transition-all"></span>
//               </h5>
//               <A href="/login">
//                 <Button>Sign in</Button>
//               </A>
//               <A href="/register">
//                 <Button>Sign up</Button>
//               </A>
//             </div>
//           </div>
//         </header>
//         {props.children}
//         <footer></footer>
//       </Show>
//     </>
//   )
// }