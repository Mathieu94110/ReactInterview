import { store } from './app/store.ts';
import ReactDOM from 'react-dom';
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)