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
        <div class="my-6 flex flex-col space-y-3 items-center px-6 lg:px-0">
          <h5 class="text-6xl text-center text-primary-500 capitalize antialiased font-bold tracking-wide">
            Learn by doing
          </h5>

          <h4 class="text-2xl text-center capitalize antialiased font-bold tracking-wide">
            The best place to let your imagination grow
          </h4>

          <div class="max-w-screen-md">
            <h3 class="text-xl text-center antialiased">
              A unique and innovative space where you can develop and create, together with the
              necessary materials and tools, your ideas. The project aims to give everyone access to
              a fun environment where they can use all the services free of charge.
            </h3>
          </div>

          <a href="#map">
            <Button>
              <IconMap class="h-4 w-4 text-black" />
              <span>Discover us</span>
            </Button>
          </a>

          <h5 class="text-6xl text-center text-primary-500 capitalize antialiased font-bold tracking-wide !mt-28">
            our services
          </h5>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 transition-colors duration-500 space-y-2 flex flex-col items-center">
              <h2 class="text-2xl text-center">Laboratories</h2>
              <p class="flex-grow text-center">
                A list of open laboratories distributed around the university campus.
              </p>
              <A href="/">
                <Button>
                  <span>View all Laboratories</span>
                </Button>
              </A>
            </div>
            <div class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 transition-colors duration-500 space-y-2 flex flex-col items-center">
              <h2 class="text-2xl text-center">Machines</h2>
              <p class="flex-grow text-center">
                A wide range of different kind of machines which are configured and ready for use.
              </p>
              <A href="/">
                <Button>
                  <span>View all Machines</span>
                </Button>
              </A>
            </div>
            <div class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 transition-colors duration-500 space-y-2 flex flex-col items-center">
              <h2 class="text-2xl text-center">Reservations</h2>
              <p class="flex-grow text-center">
                An intuitive reservation system capable of booking a specific machine on a day and
                hour.
              </p>
              <A href="/createReservation">
                <Button>
                  <span>Create a Reservation</span>
                </Button>
              </A>
            </div>
          </div>

          <h5 class="text-6xl text-center text-primary-500 capitalize antialiased font-bold tracking-wide !mt-28">
            where we are
          </h5>

          <iframe
            class="w-full rounded-xl"
            id="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.2469561852745!2d1.826744615129747!3d41.736765882226514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4580630229067%3A0x267710eb82e6d8d7!2sEscuela%20Polit%C3%A9cnica%20Superior%20de%20Ingenier%C3%ADa%20de%20Manresa!5e0!3m2!1ses!2ses!4v1673023744464!5m2!1ses!2ses"
            // width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </Layout>
    </>
  )
}

export default Home
