export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
