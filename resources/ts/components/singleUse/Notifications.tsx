import { render, Portal } from 'solid-js/web'
import { Motion, Presence } from '@motionone/solid'
import { createSignal, Show, createContext, useContext, onCleanup, ParentComponent } from 'solid-js'
import IconCheck from '../Icons/Check'

export const NotificationContext = createContext<{ notify: (msg: string) => void }>({
  notify: () => {},
})

// const { notify } = useContext(NotificationContext);

const Notifications: ParentComponent = (props) => {
  const [message, setMessage] = createSignal<string>()
  const [id, setId] = createSignal<number>()

  const notify = (msg: string) => {
    setMessage(msg)

    if (message()) {
      clearTimeout(id())
      setId(setTimeout(() => setMessage(undefined), 3000))
    }

    setId(setTimeout(() => setMessage(undefined), 3000))
    onCleanup(() => clearTimeout(id()))
  }

  return (
    <>
      <Portal>
        <Presence exitBeforeEnter>
          <Show when={message() !== undefined}>
            <Motion.div
              class="fixed inset-0 w-full h-full bg-transparent flex items-start justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <div class="bg-green-500 rounded mt-8 p-4 text-black flex space-x-2 items-center max-w-xl">
                <IconCheck class="h-6 w-6" />
                <span>{message()}</span>
              </div>
            </Motion.div>
          </Show>
        </Presence>
      </Portal>
      <NotificationContext.Provider value={{ notify }}>
        {props.children}
      </NotificationContext.Provider>
    </>
  )
}

export default Notifications
