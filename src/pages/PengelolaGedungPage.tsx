import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import PengelolaTableComponent from "../components/PengelolaTableComponent";
import { AddPengelolaModal } from "../components/pengelola/AddPengelolaModal";
import { usePengelola } from "../states/pengelola";
import { useNavigate } from "react-router";
import { useSettings } from "../states/settings";
import { useUsers } from "../states/users";

export default function PengelolaGedungPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const getPengelolaGedung = usePengelola((state) => state.getPengelolaGedung);
  const getUsers = useUsers((state) => state.getUsers);
  const getSettings = useSettings((state) => state.getSettings);
  const role = useSettings((state) => state.dataUser?.data.role);
  const navigate = useNavigate();
  useEffect(() => {
    // If the user is not admin, redirect to dashboard and cancel the fetch
    if (role !== "admin" && role !== "manajement") {
      navigate("/");
      return;
    }
    // Fetch all required data
    const fetchData = async () => {
      await Promise.all([getPengelolaGedung(), getUsers(), getSettings()]);
    };

    fetchData();
  }, [role, navigate, getPengelolaGedung, getUsers, getSettings]);

  useEffect(() => {
    document.title = "Smartbuilding | Pengelola Gedung";
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-2 md:p-3 sm:p-1">
        <div className="flex flex-col">
          <h2 className="text-primary-500 font-bold text-xl md:text-2xl">
            Pengelola Gedung
          </h2>
          <p className="text-gray-600 mt-1">
            Kelola semua pengelola gedung di sini.
          </p>
        </div>
        <Button
          size="xs"
          className="bg-primary-400 hover:bg-primary-500 text-white px-4 py-2 rounded-md"
          onClick={() => setOpenModal(true)}>
          Tambah Pengelola
        </Button>
      </div>{" "}
      {openModal && (
        <AddPengelolaModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <PengelolaTableComponent />
    </div>
  );
}
