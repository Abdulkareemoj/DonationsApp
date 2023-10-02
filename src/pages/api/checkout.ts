// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Paystack from "paystack";
const paystack = Paystack("SECRET_KEY");


type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST"){
      res.status(405).json({ message: 'Method not allowed' })
  }
const name = req.body.name || "Anonymous"
const message = req.body.message || ""
const quantity = req.body .quantity || 1 
//write error handling for if quantity doesnt exist


try{
const session = paystack.transaction.initialize({
    name: "Transaction or product name",
    email: "The user email",
    amount: amount * 100, // this because paystack also send kobo
    quantity: "quantity of product just for reference purposes",
    callback_url: "redirect URL"
    metadata:{
         //other information you want to send with the transaction and check when verifying
         userId: ""
     }
  }).then(async(transaction) =>{
  console.log(transaction)
}}catch(e){}
res.status(200).json()
}