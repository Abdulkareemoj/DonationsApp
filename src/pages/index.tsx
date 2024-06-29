import MainCard from "@/components/mainCard";
import DonationForm from "@/components/donationForm";
import Donations from "@/components/recentDonations";
export default function Home() {
  return (
    <main>
      <div className="flex flex-col md:flex-row mx-auto pt-10 justify-between">
        <MainCard />
        <DonationForm />
      </div>
      <div className="mx-auto p-10">
        <Donations />
      </div>
    </main>
  );
}
