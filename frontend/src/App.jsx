import './App.css'
import Hero from './pages/Hero'
import Content from './pages/Content'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {
  return (
    <>   
      <Navbar/>
      <main>
        <Hero/>
        <Content/>
      </main>
      <Footer/>
    </>
  )
}
export default App
