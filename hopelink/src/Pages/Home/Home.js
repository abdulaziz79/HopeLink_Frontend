import React from 'react'
import Hero from '../../Components/Hero/Hero'
import styles from "./Home.module.css"
import Services from '../../Components/Services/Services'

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
      <Hero />
      </section>
      <section className={styles.services}>
      <Services />
      </section>
    </div>
  )
}

export default Home
