// import Image from "next/image";
// // import { Inter } from '@next/font/google'
// import Head from "next/head";
// import { useState } from "react";
// import { DONATION_IN_NAIRA, MAX_DONATION_IN_NAIRA } from "../../config";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// // const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const presets = [100, 200, 500, 1000];
//   return (
//     <>
//       <Head>
//         <title>Donations</title>
//       </Head>

//       <main className="full-w flex flex-col items-center">
//         <div>
//           <h1 className=" flex flex-row">
//             Send a donation
//             {presets.map((preset) => {
//               return (
//                 <Button key={preset} onClick={() => setQuantity(preset)}>
//                   {preset}
//                 </Button>
//               );
//             })}
//           </h1>
//         </div>
//         <div className=" flex flex-col">
//           <h1>You can also specify an amount(max: 10000)</h1>
//           <Input
//             type="number"
//             onChange={(e) => setQuantity(parseFloat(e.target.value))}
//             value={quantity}
//             min={100}
//             max={MAX_DONATION_IN_NAIRA / DONATION_IN_NAIRA}
//           />
//         </div>

//         <div>
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input
//               className="rounded border border-blue-600 p-2 shadow"
//               type="text"
//               id="name"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//             />
//           </div>
//           <div>
//             <Label htmlFor="message">Message</Label>
//             <Textarea
//               className="rounded border border-blue-600 p-2 shadow"
//               id="message"
//               onChange={(e) => setMessage(e.target.value)}
//               value={message}
//             />
//           </div>
//         </div>

//         <Button asChild>
//           <Link href="#"> Donate #{quantity * (DONATION_IN_NAIRA / 100)}</Link>
//         </Button>
//       </main>
//     </>
//   );
// }

import Head from "next/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_DONATION_IN_NAIRA = 10000;
const DONATION_IN_NAIRA = 100;

const DonationForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const presets = [100, 500, 1000, 5000];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 100 && value <= MAX_DONATION_IN_NAIRA) {
      setQuantity(parseFloat(value.toFixed(2)));
    }
  };

  const handlePresetClick = (value: number) => {
    setQuantity(value);
  };

  return (
    <>
      <Head>
        <title>Donations</title>
      </Head>
      <main className="full-w flex flex-col items-center">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h1>Choose a preset amount:</h1>
            <div className="flex space-x-2">
              {presets.map((preset) => (
                <Button key={preset} onClick={() => handlePresetClick(preset)}>
                  {preset}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1>Or specify an amount (max: {MAX_DONATION_IN_NAIRA}):</h1>
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={100}
              max={MAX_DONATION_IN_NAIRA}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="message">Message:</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <Button asChild>
          <Link href="#"> Donate #{quantity * (DONATION_IN_NAIRA / 100)}</Link>
        </Button>
      </main>
    </>
  );
};

export default DonationForm;
