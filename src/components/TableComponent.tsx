import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { ModalExample } from "./ModalExample";
import { ModalDelete } from "./ModalDeleteConfirmation";
import { useSettings } from "../states/settings";
import { getDataRole } from "../utils/backupData";

export interface TableSettings {
  id: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  data_toren: Array<{ monitoring_name: string; kapasitas_toren: number }>;
}

interface ModalState {
  editModal: boolean;
  deleteModal: boolean;
  addModal: boolean;
}

// interface TableComponentProps {
//   settings: TableSettings[];
//   fetchSettings: () => void;
// }

export default function TableComponent(): JSX.Element {
  const [openModal, setOpenModal] = useState<ModalState>({
    editModal: false,
    deleteModal: false,
    addModal: false,
  });
  const [selectedSetting, setSelectedSetting] = useState<TableSettings | null>(
    null
  );

  console.log(`modal yang terbuka`, openModal);

  const settings = useSettings((state) => state.settings) ?? [];
  const loading = useSettings((state) => state.loading);
  const role = getDataRole();

  const handleEdit = (setting: TableSettings) => {
    setSelectedSetting(setting);
    setOpenModal((prev) => ({
      ...prev,
      editModal: true,
    }));
  };

  const handleDelete = (setting: TableSettings) => {
    setSelectedSetting(setting);
    setOpenModal((prev) => ({
      ...prev,
      deleteModal: true,
    }));
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  console.log(`selected setting`, selectedSetting);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Gedung
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Listrik
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Listrik
              </th>
              <th scope="col" className="px-6 py-3">
                Schedule Time (Detik)
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {settings instanceof Array ? (
              settings.map((setting: TableSettings, index: number) => (
                <tr
                  key={setting.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{setting.nama_gedung}</td>
                  <td className="px-6 py-4">{setting.harga_listrik}</td>
                  <td className="px-6 py-4">{setting.jenis_listrik}</td>
                  <td className="px-6 py-4">{setting.scheduler}</td>
                  <td className="px-6 py-4 flex flex-row gap-x-2">
                    <Button
                      color="blue"
                      size="xs"
                      onClick={() => handleEdit(setting)}
                      className="transition-colors duration-200">
                      Edit
                    </Button>
                    {role === "admin" && (
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(setting)}
                        className="transition-colors duration-200 bg-red-100 text-white">
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No settings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Gedung */}
      {openModal.editModal && selectedSetting && (
        <div className="modal">
          <ModalExample
            openModal={openModal.editModal}
            setOpenModal={(value) =>
              setOpenModal((prev) => ({ ...prev, editModal: value }))
            }
            selectedSetting={selectedSetting}
            // fetchSettings={fetchSettings}
          />
        </div>
      )}

      {/* Modal Delete Gedung */}
      {openModal.deleteModal && selectedSetting && (
        <div className="modal">
          <ModalDelete
            openModal={openModal.deleteModal}
            setOpenModal={(value) =>
              setOpenModal((prev) => ({ ...prev, deleteModal: value }))
            }
            idBangunan={selectedSetting.id}
            namaBangunan={selectedSetting.nama_gedung}
          />
        </div>
      )}
    </>
  );
}
