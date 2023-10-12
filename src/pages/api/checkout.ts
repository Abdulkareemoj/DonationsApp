import type { NextApiRequest, NextApiResponse } from "next";
import Paystack from "paystack";

const paystack = Paystack("SECRET_KEY");

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const name = req.body.name || "Anonymous";
  const message = req.body.message || "";
  const quantity = req.body.quantity;
  const amountInKobo = (parseFloat(req.body.amount) * 100).toFixed(0);
  const email = req.body.email;
  const reference = req.body.reference;

  if (!quantity) {
    res.status(400).json({ message: "Quantity is required" });
    return;
  }

  try {
    // const amount = 1000; // Replace with the actual amount of the product
    const session = await paystack.transaction.initialize({
      name: "Transaction or product name",
      amount: amountInKobo,
      email: email,
      reference: reference,
      metadata: {
        recordId: req.body.recordId,
      },
      quantity: quantity,
      callback_url: "redirect URL",
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    });
    console.log(session);
    res.status(200).json({ message: "Transaction initialized successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "An error occurred while initializing transaction",
    });
  }
}
