import Image from "next/image";
// import { Inter } from '@next/font/google'
import Head from "next/head";
import { useState } from "react";
import { DONATION_IN_KOBO, MAX_DONATION_IN_KOBO } from "../../config";
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const presets = [1, 2, 5];
  return (
    <>
      <Head>
        <title>Donations</title>
      </Head>
      <div>
        <main>
          <div>
            <h1>
              Send a donation
              {presets.map((preset) => {
                return (
                  <button key={preset} onClick={() => setQuantity(preset)}>
                    {preset}
                  </button>
                );
              })}
              <input
                type="number"
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                value={quantity}
                min={1}
                max={MAX_DONATION_IN_KOBO / DONATION_IN_KOBO}
              />
            </h1>
            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
            </div>
          </div>
          <button>Donate #{quantity * (DONATION_IN_KOBO / 100)}</button>
        </main>
      </div>
    </>
  );
}
