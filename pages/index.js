import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Home() {

  return (
    <div>
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}
