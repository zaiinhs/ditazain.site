import React from "react";
import Image from "next/image";
import { ClipboardCopy } from "lucide-react";

interface BankAccountProps {
  logo: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const BankAccount: React.FC<BankAccountProps> = ({
  logo,
  bankName,
  accountName,
  accountNumber,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Image
        src={logo}
        alt={bankName}
        width={150}
        height={50}
        className="mb-2"
      />
      <p className="text-sm text-gray-600">{accountName}</p>
      <p className="text-lg font-semibold mb-2">{bankName}</p>
      <p className="text-sm text-gray-600 mb-2">Nomor Rekening</p>
      <p className="text-lg font-semibold mb-4">{accountNumber}</p>
      <button
        onClick={copyToClipboard}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <ClipboardCopy className="w-4 h-4 mr-2" />
        Copy Rekening
      </button>
    </div>
  );
};

export default function BankInfoComponent({ type }: { type: string }) {
  console.log(type);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mt-2">Kirim Kado</h1>
      </div>
      <p className="text-sm text-gray-600 text-center mb-6">
        Terima kasih atas doa dan restu yang telah anda berikan, jika anda ingin
        mengirimkan kado nikah, silahkan kirim dengan cara dibawah ini.
        Sebelumnya kami mengucapkan banyak terima kasih.
      </p>
      {type === "husband" ? (
        <>
          <BankAccount
            logo="/images/bca.png"
            bankName="Bank Central Asia"
            accountName="Nama Bank"
            accountNumber="0391636167"
          />
          <BankAccount
            logo="/images/shopeepay.png"
            bankName="ShopeePay"
            accountName="Nama Bank"
            accountNumber="082332477256"
          />
        </>
      ) : (
        <BankAccount
          logo="/images/mandiri.png"
          bankName="Bank Mandiri"
          accountName="Nama Bank"
          accountNumber="1430018337582"
        />
      )}
    </div>
  );
}
