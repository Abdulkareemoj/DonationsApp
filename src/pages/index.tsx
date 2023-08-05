import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head' 
import { useState } from 'react'
import { DONATION_IN_NAIRA, MAX_DONATION_IN_NAIRA } from '../../config'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const presets =[100,200,500]
  return (
  <><Head> 

    </Head><div>
      
      </div></>
  )
}
