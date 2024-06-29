import React from "react";

export default function DonationsList() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Donation List</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-3 text-left font-medium sm:px-6 lg:px-8">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium sm:px-6 lg:px-8">
                Email
              </th>
              <th className="px-4 py-3 text-right font-medium sm:px-6 lg:px-8">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium sm:px-6 lg:px-8">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">John Doe</td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                john@example.com
              </td>
              <td className="px-4 py-3 text-right sm:px-6 lg:px-8">$50.00</td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                Thank you for your support!
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                Jane Smith
              </td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                jane@example.com
              </td>
              <td className="px-4 py-3 text-right sm:px-6 lg:px-8">$25.00</td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                I&apos;m happy to contribute.
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                Michael Johnson
              </td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                michael@example.com
              </td>
              <td className="px-4 py-3 text-right sm:px-6 lg:px-8">$100.00</td>
              <td className="px-4 py-3 text-left sm:px-6 lg:px-8">
                Keep up the great work!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
