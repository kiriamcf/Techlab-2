import { ParentComponent } from 'solid-js'
import Button from './components/Button'
import { A } from '@solidjs/router'

const Layout: ParentComponent = (props) => {
  return (
    <>
      <header class="w-full bg-neutral-800 text-white py-5">
        <div class="max-w-5xl mx-auto flex justify-between content-center">
          <A href="/">
            <h5 class="uppercase text-2xl font-semibold">techlab</h5>
          </A>
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
            <A href="/login">
              <Button>Sign in</Button>
            </A>
            <A href="/register">
              <Button>Sign up</Button>
            </A>
          </div>
        </div>
      </header>
      {props.children}
      <footer></footer>
    </>
  )
}

export default Layout
