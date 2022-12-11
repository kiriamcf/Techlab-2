import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import upc from '../assets/images/upc.png'
import IconMap from './components/Icons/Map'
import Button from './components/Button'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import Layout from './components/Layout'

const Home: Component = () => {
  return (
    <>
      <Layout>
        <div class="my-8">
          <Card>
            <div class="flex flex-wrap -mx-3 items-center">
              <div class="flex flex-col space-y-3 w-full md:w-2/3 px-3">
                <CardTitle>Services</CardTitle>
                <p class="mt-4">
                  We offer a wide range of services distributed in different areas of the university
                  campus free of charge. You only need an account to access our platform, what are
                  you waiting for!
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
        </div>
      </Layout>
    </>
  )
}

export default Home
