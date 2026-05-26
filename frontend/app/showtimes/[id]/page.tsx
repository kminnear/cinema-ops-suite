"use client";

import { useState } from "react";

type SeatStatus = "available" | "selected" | "occupied";

type Seat = {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
};

const rows = ["A", "B", "C", "D", "E", "F"];

const initialSeats: Seat[] = rows.flatMap((row) =>
  Array.from({ length: 10 }, (_, index) => {
    const seatNumber = index + 1;

    const occupiedSeats = ["A3", "A4", "C5", "D7", "E2", "F9"];

    const id = `${row}${seatNumber}`;

    return {
      id,
      row,
      number: seatNumber,
      status: occupiedSeats.includes(id) ? "occupied" : "available",
    };
  })
);

export default function SeatSelectionPage() {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);

  const selectedSeats = seats.filter((seat) => seat.status === "selected");

  const ticketPrice = 18;
  const total = selectedSeats.length * ticketPrice;

  function toggleSeat(seatId: string) {
    setSeats((currentSeats) =>
      currentSeats.map((seat) => {
        if (seat.id !== seatId || seat.status === "occupied") {
          return seat;
        }

        return {
          ...seat,
          status: seat.status === "selected" ? "available" : "selected",
        };
      })
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="text-red-400 hover:text-red-300">
          ← Back to movies
        </a>

        <h1 className="text-4xl font-bold mt-6">Choose Your Seats</h1>

        <p className="text-zinc-400 mt-2">
          Select seats for your movie showing.
        </p>

        <div className="mt-10 mb-12">
          <div className="mx-auto h-4 max-w-2xl rounded-full bg-zinc-700" />
          <p className="text-center text-zinc-500 text-sm mt-3">SCREEN</p>
        </div>

        <section className="space-y-4">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center gap-3">
              <span className="w-6 text-zinc-500 font-semibold">{row}</span>

              {seats
                .filter((seat) => seat.row === row)
                .map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => toggleSeat(seat.id)}
                    disabled={seat.status === "occupied"}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                      seat.status === "available"
                        ? "bg-zinc-800 hover:bg-zinc-700"
                        : seat.status === "selected"
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-zinc-950 text-zinc-700 cursor-not-allowed"
                    }`}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-zinc-800" />
            Available
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-red-600" />
            Selected
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-zinc-950 border border-zinc-800" />
            Occupied
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <p className="text-zinc-400 mt-3">
            Seats:{" "}
            {selectedSeats.length > 0
              ? selectedSeats.map((seat) => seat.id).join(", ")
              : "None selected"}
          </p>

          <p className="text-zinc-400 mt-2">
            Tickets: {selectedSeats.length}
          </p>

          <p className="text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </p>

          <button
            disabled={selectedSeats.length === 0}
            className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
          >
            Continue to Checkout
          </button>
        </section>
      </div>
    </main>
  );
}