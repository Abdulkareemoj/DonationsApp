import Image from "next/image";
// import { Inter } from '@next/font/google'
import Head from "next/head";
import { useState } from "react";
import { DONATION_IN_NAIRA, MAX_DONATION_IN_NAIRA } from "../../config";
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const presets = [100, 200, 500, 1000];
  return (
    <>
      <Head>
        <title>Donations</title>
      </Head>

      <main className="full-w flex flex-col items-center">
        <div>
          <h1 className=" flex flex-row">
            Send a donation
            {presets.map((preset) => {
              return (
                <button
                  className="mx-2 gap-5 rounded-xl bg-blue-600 px-5 text-white"
                  key={preset}
                  onClick={() => setQuantity(preset)}
                >
                  {preset}
                </button>
              );
            })}
          </h1>
        </div>
        <div className=" flex flex-col">
          <h1>You can also specify an amount(max: 10000)</h1>
          <input
            className="rounded border border-blue-600 p-2 shadow"
            type="number"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            value={quantity}
            min={1}
            max={MAX_DONATION_IN_NAIRA / DONATION_IN_NAIRA}
          />
        </div>

        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="rounded border border-blue-600 p-2 shadow"
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              className="rounded border border-blue-600 p-2 shadow"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
        </div>

        <button className="rounded-md bg-blue-600 px-5 text-white">
          Donate #{quantity * (DONATION_IN_NAIRA / 100)}
        </button>
      </main>
    </>
  );
}
