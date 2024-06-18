import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)