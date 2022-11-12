import '../css/app.css'
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import App from './App'
import A from './A'

// render(() => <App />, document.getElementById('app') as HTMLDivElement)

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('app') as HTMLDivElement
)
