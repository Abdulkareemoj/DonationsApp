// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST"){
      res.status(400).json({ message: 'Method not allowed' })
  }
const name = req.body.name || "Anonymous"
const message = req.body.message || ""
const qauntity = req.body .quantity || 1 
//write error handling for if quantity doesnt exist
}
