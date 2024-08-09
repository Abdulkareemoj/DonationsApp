import { JSX, SVGProps, useState } from "react";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { Icons } from "@/components/ui/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
const MAX_DONATION_IN_NAIRA = 10000;
const DONATION_IN_NAIRA = 100;

const DonationForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [donationEmail, setDonationEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  // const router = useRouter();
  const presets = [100, 500, 1000, 5000, 10000];
  const [selectedPreset, setSelectedPreset] = useState("100");
  const [selectedDonation, setSelectedDonation] = useState("");

  const handlePresetChange = (value: number) => {
    if (value >= 100) {
      setSelectedPreset(value);
      setQuantity(value);
      setQuantityError("");
    } else {
      setQuantityError("Value must be greater or equal to 100");
    }
  };
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY!; // replace with your own public key
  const amount = quantity * (DONATION_IN_NAIRA / 100) * 100; // convert to kobo
  const email = donationEmail; // replace with customer's email

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    publicKey,
  };
  const initializePayment = usePaystackPayment(config);

  const handleSuccess = () => {
    // Implementation for whatever you want to do after a successful transaction.
    console.log("Success");
  };
  const handleClose = () => {
    // what you want to do when the Paystack dialog closed.
    console.log("closed");
  };

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
    setDonationEmail(value);
  };

  const handlePresetClick = (value: number) => {
    setQuantity(value);
    setQuantityError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name || !quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    if (nameError || emailError || quantityError) {
      alert("Please fix the errors in the form.");
      return;
    }

    // try {
    //   const response = await fetch("/api/checkout", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name, email, message, amount: quantity }),
    //   });

    //   const data = await response.json();
    //   console.log(data);

    //   if (!data.ok) {
    //     setError(data.error);
    //     return;
    //   }
    //   const url = data.url;
    //   router.push(url);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-6">
          <div className="relative">
            <Image
              src="/placeholder.png"
              width={24}
              height={24}
              alt="Cover"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button className="absolute top-2 right-2" variant="outline">
              Edit page
            </Button>
          </div>
          <div className="flex items-center mt-4">
            <Avatar className="mr-4">
              <AvatarImage src="/placeholder.png" />
              <AvatarFallback>HL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Henry Louis</h2>
              <p className="text-muted-foreground">Artist</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              143 supporters
            </Badge>
          </div>
          <p className="mt-4 text-muted-foreground">
            Howdy fellow animator. If you&apos;re here looking for my tutorials
            and Ae-files you&apos;re in luck.. Got a whole lot of this going on
            inside if you buy me a coffee.
          </p>
          <div className="flex items-center mt-4 space-x-2">
            <Icons.GlobeIcon className="h-6 w-6" />
            <Icons.TwitterIcon className="h-6 w-6" />
            <Icons.InstagramIcon className="h-6 w-6" />
            <Icons.LinkedinIcon className="h-6 w-6" />
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <Button variant="ghost">New post</Button>
            <Button variant="ghost">Add photo</Button>
            <Button variant="ghost">Enter Youtube or Vimeo link</Button>
          </div>
          <Input
            placeholder="Paste Youtube or Vimeo link here..."
            className="mt-4"
          />
        </div>
        <div className="w-full md:w-2/5  p-6 bg-gray-50 border-l">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold">
              Buy <span className="text-primary">Henry Louis</span> a coffee
            </h3>
            <div className="flex items-center mt-4 space-x-2">
              {/* 
                     <div className="flex items-center mt-4 space-x-2">
              <CoffeeIcon className="h-6 w-6" />
              <RadioGroup defaultValue="1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="coffee-1" className="peer sr-only" />
                  <Label
                    htmlFor="coffee-1"
                    className="inline-flex items-center justify-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground"
                  >
                    1
                  </Label>
                  <RadioGroupItem value="3" id="coffee-3" className="peer sr-only" />
                  <Label
                    htmlFor="coffee-3"
                    className="inline-flex items-center justify-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground"
                  >
                    3
                  </Label>
                  <RadioGroupItem value="5" id="coffee-5" className="peer sr-only" />
                  <Label
                    htmlFor="coffee-5"
                    className="inline-flex items-center justify-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground"
                  >
                    5
                  </Label>
                </div>
              </RadioGroup>
            </div> */}
              <div className="flex items-center space-x-2">
                <Icons.CoffeeIcon className="h-6 w-6" />
                <div className="flex items-center space-x-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset}
                      onClick={() => handlePresetChange(preset)}
                      className={`inline-flex items-center justify-center rounded-full border border-input bg-white text-black px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
                        selectedPreset === preset
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
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
            <div className="flex mt-4 space-x-2">
              <Button
                variant="outline"
                className={`flex-1 ${
                  selectedDonation === "one-time"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedDonation("one-time")}
              >
                One-time
              </Button>
              <Button
                variant="default"
                className={`flex-1 ${
                  selectedDonation === "monthly"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedDonation("monthly")}
              >
                Monthly
              </Button>
            </div>
            <Input
              placeholder="Name or @yourtwitter"
              className="mt-4"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && <span className="text-red-500">{nameError}</span>}
            <Input
              placeholder="E-Mail Address"
              className="mt-4"
              type="text"
              id="donationEmail"
              value={donationEmail}
              onChange={handleEmailChange}
              required
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
            <Textarea
              placeholder="Message (Donational)"
              className="mt-4"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center mt-4 space-x-2">
              <Checkbox id="private-message" />
              <label htmlFor="private-message" className="text-sm">
                Private message
              </label>
            </div>
            <Button
              onClick={() =>
                initializePayment({
                  onSuccess: handleSuccess,
                })
              }
              className="w-full mt-4"
            >
              Support Me %{quantity}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No sign up required.
            </p>
            <p className="mt-4 text-center text-sm">
              96 coffees received of 200 coffee goal
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
