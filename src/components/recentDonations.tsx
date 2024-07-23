import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Airtable from "airtable";

export default function Donations() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const baseId= process.env.AIRTABLE_BASE_ID
  useEffect(() => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(baseId);

    base("Table Name")
      .select({
        // Specify sorting, filtering, and fields if necessary
      })
      .eachPage(
        (records, fetchNextPage) => {
          setRecords(records);
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          setIsLoading(false);
        }
      );
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <table>
      <tbody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={record.fields.Image[0].url}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium">{record.fields.Name}</TableCell>
            <TableCell>
              <Badge variant="outline">{record.fields.Status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {record.fields.Price}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {record.fields.Quantity}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {record.fields.Date}
            </TableCell>
            <TableCell>{/* DropdownMenu for actions */}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
}
