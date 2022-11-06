import { Component } from 'solid-js'
import upc from '../assets/images/upc.png'
import IconMap from './components/Icons/Map'
import Button from './components/Button'
import Card from './components/Card'
import CardTitle from './components/CardTitle'

class Collection<T> {
  protected array: T[]

  public constructor(array: T[]) {
    this.array = array
  }
  public map(operacio: (n: T) => T) {
    const newarray: T[] = []
    for (const element of this.array) {
      newarray.push(operacio(element))
    }

    return new Collection(newarray)
  }

  public toArray() {
    return this.array
  }
}

new Collection([1, 2, 3])
  .map((e) => e * 2)
  .map((e) => e * 2)
  .toArray()

new Collection<string>([])
  .map((e) => e + '.')
  .map((e) => e + '.')
  .toArray()

const App: Component = () => {
  return (
    <>
      <header class="w-full bg-neutral-800 text-white py-5">
        <div class="max-w-5xl mx-auto flex justify-between content-center">
          <h5 class="uppercase text-2xl font-semibold">techlab</h5>
          <div class="flex items-center space-x-3">
            <h5 class="ml-4 uppercase text-sm relative group">
              <span>machines</span>
              <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-orange-300 group-hover:w-1/2 transition-all"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-orange-300 group-hover:w-1/2 transition-all"></span>
            </h5>
            <h5 class="ml-4 uppercase text-sm relative group">
              <span>laboratories</span>
              <span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-orange-300 group-hover:w-1/2 transition-all"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-orange-300 group-hover:w-1/2 transition-all"></span>
            </h5>
            <Button>Login</Button>
            <Button>Signup</Button>
          </div>
        </div>
      </header>
      <main class="max-w-5xl mx-auto my-8">
        <Card>
          <div class="flex flex-wrap -mx-3 items-center">
            <div class="flex flex-col space-y-3 w-full md:w-2/3 px-3">
              <CardTitle>Services</CardTitle>
              <p class="mt-4">
                We offer a wide range of services distributed in different areas of the university
                campus free of charge. You only need an account to access our platform, what are you
                waiting for!
              </p>
              <p class="mt-4">
                We offer a wide range of services distributed in different areas of the university
                campus free of charge. You only need an account to access our platform, what are you
                waiting for!
              </p>
              <p class="mt-4">
                We offer a wide range of services distributed in different areas of the university
                campus free of charge. You only need an account to access our platform, what are you
                waiting for!
              </p>
              <div>
                <Button>
                  <IconMap class="h-4 w-4 text-black" />
                  <span>Discover us</span>
                </Button>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3">
              <img src={upc} alt="upc" class="rounded object-cover object-center h-64 w-full" />
            </div>
          </div>
        </Card>
      </main>
      <footer></footer>
    </>
  )
}

export default App
