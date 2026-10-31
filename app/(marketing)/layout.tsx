// app/(marketing)/layout.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { LoadingPulse } from "@/components/loadingUI";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header />
      <Suspense fallback={<LoadingPulse text="Loading content..." />}>
        <main className="flex-1">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}