const Note = ({ data }: { data: Record<string, any> }) => {
  const color = data.presence ? "bg-green-600" : "bg-red-600";
  const text = data.presence ? "Hadir" : "Tidak Hadir";

  return (
    <div className="w-full shadow-md rounded-md p-3 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-accent">{data.name}</h2>
        <span
          className={`${color} h-fit rounded-md text-[10px] text-primary px-3 py-1`}
        >
          {text}
        </span>
      </div>
      <p className="text-accent text-sm">{data.messages}</p>
    </div>
  );
};

export default Note;
