import React from 'react'
import Hero from '../../Components/Hero/Hero'
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
      <Hero />
      </section>
    </div>
  )
}

export default Home
