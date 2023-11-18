import { useState } from "react";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";

const MAX_DONATION_IN_NAIRA = 10000;
const DONATION_IN_NAIRA = 100;

const DonationForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const router = useRouter();
  const presets = [100, 500, 1000, 5000];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 100 && value <= MAX_DONATION_IN_NAIRA) {
      setQuantity(parseFloat(value.toFixed(2)));
      setQuantityError("");
    } else {
      setQuantityError(
        `Amount must be between ${DONATION_IN_NAIRA} and ${MAX_DONATION_IN_NAIRA}.`
      );
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
    setName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const handlePresetClick = (value: number) => {
    setQuantity(value);
    setQuantityError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name || !email || !quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    if (nameError || emailError || quantityError) {
      alert("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, amount: quantity }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.ok) {
        setError(data.error);
        return;
      }
      const url = data.url;
      router.push(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="full-w flex flex-col mx-20  ">
      <form onSubmit={handleSubmit}>
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
              required
            />
            {quantityError && (
              <span className="text-red-500">{quantityError}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && <span className="text-red-500">{nameError}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="message">Message: </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <Button className="my-5 ">
          Donate #{quantity * (DONATION_IN_NAIRA / 100)}
        </Button>
      </form>
    </main>
  );
};
export default DonationForm;
