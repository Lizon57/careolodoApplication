// import reportWebVitals from './reportWebVitals'
import { Provider as StoreProvider } from "react-redux"
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import awsExports from "./aws-exports"
import { store } from './store/store'
import 'normalize.css'
import "./styles/style.css"
import App from './root-cmp'


Amplify.configure(awsExports)


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
