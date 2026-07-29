"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [fbData, setFbData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      cekTokenFB(token);
    }
  }, [token]);

  const cekTokenFB = async (eaabToken) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${eaabToken}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
      } else {
        setFbData(data);
      }
    } catch (err) {
      setError("Gagal terhubung ke server Facebook.");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Token Tidak Ditemukan!</h2>
        <p className="text-gray-600">Silakan kembali ke halaman utama dan jalankan Bookmarklet dari tab Facebook.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-black border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 border-b pb-3">Dashboard Auto Ads</h1>
      
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-600">Token EAAB Terdeteksi:</label>
        <textarea 
          readOnly 
          className="w-full bg-gray-50 p-3 rounded-lg border text-xs font-mono mt-1 h-24 focus:outline-none"
          value={token}
        />
      </div>

      {loading && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Sedang memverifikasi token ke server Meta...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p className="font-bold">❌ Token Kadaluarsa / Tidak Valid:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {fbData && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-lg space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">✅</span>
            <h2 className="font-bold text-lg">Token Valid & Aktif!</h2>
          </div>
          <p className="text-sm"><b>Nama Akun:</b> {fbData.name}</p>
          <p className="text-sm"><b>ID Facebook:</b> {fbData.id}</p>
          <hr className="border-emerald-200 my-3" />
          <p className="text-xs text-emerald-700 italic">
            *Status token berhasil diverifikasi. Selanjutnya siap dipasang form template Single Image, Carousel, dan Fake Link.*
          </p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Suspense fallback={<div className="p-10 text-gray-500">Memuat Dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
