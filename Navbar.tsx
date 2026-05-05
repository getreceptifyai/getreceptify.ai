import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          AI Receptionist
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/#pricing" className="text-sm text-slate-600 hover:text-slate-900">
            Pricing
          </Link>
          {session ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
