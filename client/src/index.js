import ReactDOM from "react-dom"
import App from "./App"
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index'
import thunk from 'redux-thunk'
import './index.css'

const middleware = [thunk]

const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>,document.getElementById('root'))

