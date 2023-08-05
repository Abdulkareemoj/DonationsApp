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
      <main>
        <div>
          <h1>
       {   presets.map((preset)=>{
            return(
              <button key={preset} onClick={()=>setQuantity(preset)}>{preset}</button>
            )
          })}
          
          <input 
          type="number" 
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
          value={quantity}
          min={1}
          max={MAX_DONATION_IN_NAIRA/DONATION_IN_NAIRA}
          /></h1>
          <div>
            <div>
              <label htmlFor='name'>Name</label>
              <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
             <div>
              <label htmlFor='message'>Message</label>
              <textarea id="message" onChange={(e) => setMessage(e.target.value)} value={name} />
            </div>
          </div>
        </div>
        <button>Donate #{quantity*(DONATION_IN_NAIRA) }</button>
        </main>
      </div></>
  )
}
