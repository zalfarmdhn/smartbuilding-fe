import React, { useEffect, useState } from "react";
// import { getSettings, ISettings } from "../services/settings";
import TableComponent from "../components/TableComponent";
import { useSettings } from "../states/settings";
import { Button } from "flowbite-react";
import { ModalExample } from "../components/ModalExample";
// import { getDataSetting } from "../utils/backupData";

const SettingsPage: React.FC = () => {
  // PLAN KEDUA :
  // saat inisialisasi, masukkan data settings ke local storage kemudian nanti diedit tinggal lewat localStorage.
  const [openModal, setOpenModal] = useState<boolean>(false);
  const getSettings = useSettings((state) => state.getSettings);

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
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl text-primary-500 font-bold">Settings</h1>
        <Button
          size="xs"
          className="bg-primary-400 hover:bg-primary-500 text-white px-4 py-2 rounded-md"
          onClick={() => setOpenModal(true)}>
          Tambah Gedung
        </Button>
      </div>
      {openModal && (
        <ModalExample
          openModal={openModal}
          setOpenModal={setOpenModal}
          addMode={true}
        />
      )}
      <TableComponent />
    </div>
  );
};

export default SettingsPage;
