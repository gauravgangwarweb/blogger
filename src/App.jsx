import { Provider } from "react-redux"
import Navbar from "./components/Navbar"
import store from "./redux/store"
import { BrowserRouter, Routes } from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-bg">
          <Navbar />
          {/* <Routes>

          </Routes> */}
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
