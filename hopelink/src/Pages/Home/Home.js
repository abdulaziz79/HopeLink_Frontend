import React from 'react'
import Hero from '../../Components/Hero/Hero'
import styles from "./Home.module.css"
import Services from '../../Components/Services/Services'
import Contact from '../../Components/Contact/Contact'
import About from '../About/About'
import Footer from '../../Layout/Footer/Footer'

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
      <Hero />
      </section>
      <section className={styles.services}>
      <Services />
      </section>
      <section className={styles.about}>
      <About />
      </section>
      <section className={styles.contact}>
      <Contact />
      </section>
      <section className={styles.contact}>
      <Footer />
      </section>
    </div>
  )
}

export default Home
