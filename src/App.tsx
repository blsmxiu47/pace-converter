import Header from './components/Header'
import Footer from './components/Footer'
import './App.scss'

function App() {

  return (
    <>
      <Header />
        <main>
          <section className="converter">
            <div className="inputs-row">
              <input className="input-time" type="number" min="0" max="99" placeholder="mm" />
              <span>:</span>
              <input className="input-time" type="number" min="0" max="59" placeholder="ss" />
            </div>
            <div className="inputs-row">
              <input className="input-time" type="number" min="0" max="99" placeholder="mm" />
                <span>:</span>
              <input className="input-time" type="number" min="0" max="59" placeholder="ss" />
            </div>
          </section>
        </main>
      <Footer />
    </>
  )
}

export default App