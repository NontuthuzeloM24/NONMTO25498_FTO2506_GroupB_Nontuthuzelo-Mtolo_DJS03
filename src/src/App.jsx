import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header name="Nontuthuzelo"
              place="Cape Town" />
      <Main />
      <Footer />
    </>
  )
}

export default App
