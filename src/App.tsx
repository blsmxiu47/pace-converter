import Header from './components/Header'
import PaceConverter from './components/PaceConverter'
import Footer from './components/Footer'
import './fonts/Quantico-Regular.ttf'
import './App.scss'

function App() {

  return (
    <>
      <Header />
      <main>
        <PaceConverter />
      </main>
      <Footer />
    </>
  )
}

export default App