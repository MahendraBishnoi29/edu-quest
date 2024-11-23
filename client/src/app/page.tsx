import NonDashboardNav from "@/components/non-dashboard-navbar";
import LandingPage from "./(nondashboard)/landing/page";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNav />
      <main className="nondashboard-layout__main">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
