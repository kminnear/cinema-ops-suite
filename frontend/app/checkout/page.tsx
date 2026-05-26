"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);

  const showtimeId = searchParams.get("showtimeId");
  const seats = searchParams.get("seats")?.split(",") ?? [];
  const total = Number(searchParams.get("total") ?? 0);

  if (confirmed) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <section className="max-w-2xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-center">
          <h1 className="text-4xl font-bold text-red-500">
            Ticket Confirmed
          </h1>

          <p className="text-zinc-400 mt-4">
            Your seats have been reserved.
          </p>

          <div className="mt-8 rounded-xl bg-white text-black p-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              Digital Ticket
            </p>

            <h2 className="text-2xl font-bold mt-2">Cinema Ops Suite</h2>

            <p className="mt-4">Showtime #{showtimeId}</p>
            <p>Seats: {seats.join(", ")}</p>
            <p>Total Paid: ${total.toFixed(2)}</p>

            <div className="mt-6 mx-auto h-32 w-32 bg-black grid grid-cols-4 gap-1 p-2">
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="bg-white" />
              ))}
            </div>
          </div>

          <a
            href="/"
            className="inline-block mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
          >
            Back to Home
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <section className="max-w-2xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-8">
        <a href="/showtimes/1" className="text-red-400 hover:text-red-300">
          ← Back to seats
        </a>

        <h1 className="text-4xl font-bold mt-6">Checkout</h1>

        <p className="text-zinc-400 mt-2">
          Review your ticket details before confirming.
        </p>

        <div className="mt-8 space-y-4 rounded-xl bg-zinc-950 p-6 border border-zinc-800">
          <div className="flex justify-between">
            <span className="text-zinc-400">Showtime</span>
            <span>#{showtimeId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Seats</span>
            <span>{seats.join(", ")}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Tickets</span>
            <span>{seats.length}</span>
          </div>

          <div className="flex justify-between text-xl font-bold pt-4 border-t border-zinc-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-zinc-950 p-6 border border-zinc-800">
          <h2 className="text-xl font-bold">Payment</h2>

          <p className="text-zinc-500 text-sm mt-2">
            Demo checkout only — no real payment is processed.
          </p>

          <input
            disabled
            value="4242 4242 4242 4242"
            className="mt-4 w-full rounded-lg bg-zinc-800 px-4 py-3 text-zinc-400"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              disabled
              value="12/30"
              className="rounded-lg bg-zinc-800 px-4 py-3 text-zinc-400"
            />

            <input
              disabled
              value="123"
              className="rounded-lg bg-zinc-800 px-4 py-3 text-zinc-400"
            />
          </div>
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="mt-8 w-full rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
        >
          Confirm Purchase
        </button>
      </section>
    </main>
  );
}