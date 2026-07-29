"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [appUrl, setAppUrl] = useState("");

  // Otomatis deteksi domain Vercel / Localhost secara dinamis
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAppUrl(window.location.origin);
    }
  }, []);

  const bookmarkletCode = `javascript:(async function(){
    if(!window.location.hostname.includes('facebook.com')){
      alert('Tolong klik bookmark ini saat kamu sedang membuka halaman Facebook!');
      return;
    }
    try {
      document.body.insertAdjacentHTML('beforeend', '<div id="ads-loader" style="position:fixed;top:20px;right:20px;background:#2563eb;color:white;padding:15px;border-radius:8px;z-index:999999;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.1);font-family:sans-serif;">Mencari token EAAB di latar belakang... ⏳</div>');
      
      let res = await fetch('/adsmanager/manage/campaigns');
      let text = await res.text();
      let match = text.match(/(EAAB\\w+)/);
      
      if(match){
        document.getElementById('ads-loader').innerText = 'Token ditemukan! Mengalihkan... ✅';
        setTimeout(() => {
          window.location.href='${appUrl}/dashboard?token='+match[0];
        }, 1000);
      } else {
        document.getElementById('ads-loader').remove();
        alert('Token EAAB tidak ditemukan! Pastikan akun FB ini sudah punya akses Ads Manager.');
      }
    } catch(err) {
      alert('Terjadi kesalahan saat menyedot token.');
      if(document.getElementById('ads-loader')) document.getElementById('ads-loader').remove();
    }
  })();`.replace(/\s+/g, ' ');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-black">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Auto Ads Tools</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Penyedot Token EAAB Otomatis tanpa ribet pasang Extension.
        </p>

        <div className="text-left bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 text-sm text-blue-950">
          <p className="font-semibold mb-2">Cara Penggunaan:</p>
          <ol className="list-decimal ml-4 space-y-2">
            <li>Aktifkan <b>Bookmark Bar</b> Chrome (Tekan <kbd className="bg-white px-1.5 py-0.5 rounded border text-xs shadow-sm">Ctrl + Shift + B</kbd>).</li>
            <li>Tarik (Drag) tombol biru di bawah ke Bookmark Bar kamu.</li>
            <li>Buka tab Facebook (Bebas di halaman beranda atau mana saja).</li>
            <li>Klik bookmark yang tadi kamu tarik.</li>
          </ol>
        </div>

        {appUrl ? (
          <a 
            href={bookmarkletCode}
            className="inline-block bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full shadow-md hover:bg-blue-700 transition cursor-grab active:cursor-grabbing"
            title="Tarik tombol ini ke Bookmark Bar Chrome"
          >
            Ambil Token EAAB 🚀
          </a>
        ) : (
          <div className="text-gray-400 text-sm">Menyiapkan tombol...</div>
        )}
      </div>
    </main>
  );
}
