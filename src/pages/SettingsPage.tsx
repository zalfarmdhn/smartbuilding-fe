import React, { useEffect, useState } from "react";
// import { getSettings, ISettings } from "../services/settings";
import TableComponent from "../components/TableComponent";
import { useSettings } from "../states/settings";
import { Button } from "flowbite-react";
import { AddSettingModal } from "../components/settings/AddSettingModal";
// import { getDataSetting } from "../utils/backupData";

const SettingsPage: React.FC = () => {
  // PLAN KEDUA :
  // saat inisialisasi, masukkan data settings ke local storage kemudian nanti diedit tinggal lewat localStorage.
  const [openModal, setOpenModal] = useState<boolean>(false);
  const getSettings = useSettings((state) => state.getSettings);
  const role = useSettings((state) => state.dataUser?.data.role);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    document.title = "Smartbuilding | Settings";
  }, []);

  // if (!settings) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-2 md:p-3 sm:p-1">
        <div className="flex flex-col">
          <h2 className="text-primary-500 font-bold text-xl md:text-2xl">
            Pengaturan
          </h2>
          <p className="text-gray-600 mt-1">
            Atur semua pengaturan sistem bangunan di sini.
          </p>
        </div>
        {role === "admin" && (
          <Button
            size="xs"
            className="bg-primary-400 hover:bg-primary-500 text-white px-4 py-2 rounded-md"
            onClick={() => setOpenModal(true)}>
            Tambah Gedung
          </Button>
        )}
      </div>{" "}
      {openModal && (
        <AddSettingModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <TableComponent />
    </div>
  );
};

export default SettingsPage;
