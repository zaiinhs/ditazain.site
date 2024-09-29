"use client";

import React, { useState } from "react";

const MessagesPage: React.FC = () => {
  const [guestList, setGuestList] = useState("");
  const [invitations, setInvitations] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [partnerType, setPartnerType] = useState("husband");

  const generateInvitations = () => {
    const guests = guestList.split("\n").filter((name) => name.trim() !== "");
    let output = "";

    guests.forEach((guest) => {
      const invitation = `Yth. *${guest}*
  
Assalamu'alaikum Warahmatullahi Wabarakatuh,
  
Dengan penuh rasa syukur, kami *Zainal & Dita* mengundang Anda untuk menjadi bagian dari momen indah dalam hidup kami.
  
_"Cinta adalah perjalanan yang penuh warna, di mana dua hati bersatu dalam satu irama."_
  
Mari bersama merayakan hari bahagia ini, anda dapat mengakses undangan digital kami di:
*https://ditazain.site?p=${partnerType}&guest=${encodeURIComponent(guest)}*
  
Semoga kehadiran Anda menjadi berkah dan memperindah hari spesial kami.
Wassalamu'alaikum Warahmatullahi Wabarakatuh.
  
------------------------`;
      output += invitation;
    });

    setInvitations(output);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitations).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="max-w-[480px] mx-auto p-4 bg-gray-900 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Messages</h1>
      <main className="bg-gray-900 h-screen">
        <div className="mb-4">
          <label className="block text-white mb-2">Pilih Jenis Undangan:</label>
          <select
            className="bg-gray-800 text-white p-2 px-4 rounded-md w-full pl-1"
            value={partnerType}
            onChange={(e) => setPartnerType(e.target.value)}
          >
            <option value="husband">Suami</option>
            <option value="wife">Istri</option>
          </select>
        </div>

        <textarea
          className="bg-gray-800 text-white p-2 rounded-md w-full"
          value={guestList}
          onChange={(e) => setGuestList(e.target.value)}
          placeholder="Masukkan daftar nama tamu, satu nama per baris"
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-4"
          onClick={generateInvitations}
        >
          Buat Pesan
        </button>

        {invitations && (
          <>
            <pre className="bg-gray-800 text-white p-2 rounded-md w-full mt-4 overflow-auto whitespace-pre-wrap break-words max-h-[50vh] text-left">
              {invitations}
            </pre>
            <button
              className="bg-green-500 text-white p-2 rounded-md w-full mt-4 hover:bg-green-600 transition-colors"
              onClick={copyToClipboard}
            >
              {copySuccess ? "Tersalin!" : "Salin Pesan"}
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;
