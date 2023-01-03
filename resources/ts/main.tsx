import '../css/app.css'
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import App from './App'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('app') as HTMLDivElement
)
