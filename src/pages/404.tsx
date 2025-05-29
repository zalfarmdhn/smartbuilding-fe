export default function NotFoundPage({
  link,
  className,
}: {
  link?: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} flex flex-col gap-x-4 items-center justify-center min-h-screen`}>
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-6 text-2xl font-semibold">Halaman tidak Ditemukan</h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        // Kalau link tidak ada, kembali ke halaman login
        onClick={() => (window.location.href = `/${link ?? ""}`)}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
