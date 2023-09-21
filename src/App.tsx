import Header from './components/Header'
import Footer from './components/Footer'
import './App.scss'

function App() {

return (
  <>
    <Header />
      <main>
        <div className="inputs-row">
          <input className="input-time__minutes" type="text" placeholder="mm" />
          <span>:</span>
          <input className="input-time__seconds" type="text" placeholder="ss" />
        </div>
        <div className="result-row">
          <div> . </div>
          <span>:</span>
          <div> . </div>
        </div>
      </main>
    <Footer />
  </>
)
}

export default App