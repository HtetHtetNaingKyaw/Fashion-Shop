import Image from "next/image";
import Link from "next/link";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Left Sidebar Branding */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex">

        {/* Background Image Container */}
        {/* FIX: Removed -z-10 and placed behind elements using flex layout ordering */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1665418393381-367d23dc35bc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion background"
            fill
            className="object-cover opacity-60"
            priority
            unoptimized // Bypass Next.js image optimization temporarily to test loading
          />
          {/* Subtle Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20 z-10" />
        </div>

        {/* Content wrapper with z-20 so text stays on top of the image */}
        <div className="relative z-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
            Fashion Shop
          </span>
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Members Only
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Style that moves <br />
            with you.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-zinc-300">
            Sign in to browse curated looks, save favorites, and checkout faster
            with a seamless shopping experience.
          </p>
        </div>

        {/* Feature Cards Bottom Section */}
        <div className="relative z-20 space-y-3 pt-8">
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-colors hover:bg-black/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Curated collections</h2>
              <p className="text-xs text-zinc-300">Fresh styles for every season and occasion.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-colors hover:bg-black/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Fast delivery</h2>
              <p className="text-xs text-zinc-400">Track orders and get updates in real time.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-colors hover:bg-black/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Secure checkout</h2>
              <p className="text-xs text-zinc-400">Protected payments and verified sign-in.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content Form Area */}
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 items-center justify-center px-4 py-1">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}