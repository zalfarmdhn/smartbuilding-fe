import { Spinner } from "flowbite-react";

export default function LoadingLayout() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg border flex items-center space-x-3">
        <Spinner
          size="sm"
          aria-label="Loading spinner"
          className="me-3"
          light
        />
        <span className="text-gray-700 font-medium">Memuat halaman</span>
      </div>
    </div>
  );
}
