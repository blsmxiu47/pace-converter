import './fonts/Quantico-Regular.ttf'
import './App.scss'

import Header from './components/Header'
import Navbar from './components/Navbar'
import PaceConverter from './components/PaceConverter'
import PaceTimeConverter from './components/PaceTimeConverter'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <main>
        <Navbar />
        <PaceConverter />
        <PaceTimeConverter />
      </main>
      <Footer />
    </>
  )
}

export default App