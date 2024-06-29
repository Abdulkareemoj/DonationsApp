import MainCard from "@/components/mainCard";
import DonationForm from "@/components/donationForm";
export default function Home() {
  return (
    <>
      <main className="flex flex-col md:flex-row mx-auto pt-10 justify-between">
        <MainCard />
        <DonationForm />
      </main>
    </>
  );
}
