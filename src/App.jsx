import { Provider } from "react-redux"
import Navbar from "./components/Navbar"
import store from "./redux/store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Posts from "./pages/Posts"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
