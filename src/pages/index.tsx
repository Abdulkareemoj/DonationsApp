import MainCard from "@/components/mainCard";
import DonationForm from "@/components/donationForm";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-row mt-10 gap-10">
        <MainCard />
        <DonationForm />
      </main>
      <Footer />
    </>
  );
}
