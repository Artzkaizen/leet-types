export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#007acc]"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
