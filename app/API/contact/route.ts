import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Semua field wajib diisi" },
      { status: 400 }
    );
  }

  // simulasi simpan data (bisa nanti ke database)
  console.log("DATA MASUK:", body);

  return NextResponse.json({
    message: "Pesan berhasil dikirim 🚀",
  });
}