import Footer from "@/components/footer";
import NonDashboardNav from "@/components/non-dashboard-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNav />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
}
