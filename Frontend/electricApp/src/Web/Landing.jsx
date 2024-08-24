import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Section2 from "../components/Section2"
import Section3 from "../components/Section3"
import Section4 from "../components/Section4"
import Section_1 from "../components/Section_1"

const Landing = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Section_1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Footer/>
    </div>
  )
}

export default Landing