import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { usePengelola } from "../states/pengelola";
import { IPengelolaGedung } from "../types/pengelola";
import { useSettings } from "../states/settings";
import { DeletePengelolaModal } from "./pengelola/DeletePengelolaModal";
import { EditPengelolaModal } from "./pengelola/EditPengelolaModal";

interface ModalState {
  editModal: boolean;
  deleteModal: boolean;
  addModal: boolean;
}

export default function PengelolaTableComponent(): JSX.Element {
  const [openModal, setOpenModal] = useState<ModalState>({
    editModal: false,
    deleteModal: false,
    addModal: false,
  });
  const [selectedPengelola, setSelectedPengelola] =
    useState<IPengelolaGedung | null>(null);
  const pengelolaList = usePengelola((state) => state.pengelolaList);
  const loading = usePengelola((state) => state.loading);
  const settings = useSettings((state) => state.settings);
  const user = useSettings((state) => state.dataUser);

  // Only admin can delete pengelola
  const isAdmin = user?.data?.role === "admin";

  const handleEdit = (pengelola: IPengelolaGedung) => {
    setSelectedPengelola(pengelola);
    setOpenModal((prev) => ({
      ...prev,
      editModal: true,
    }));
  };
  const handleDelete = (pengelola: IPengelolaGedung) => {
    setSelectedPengelola(pengelola);
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
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Gedung
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pengelolaList instanceof Array ? (
              pengelolaList.map(
                (pengelola: IPengelolaGedung, index: number) => (
                  <tr
                    key={pengelola.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{pengelola.username}</td>
                    <td className="px-6 py-4">{pengelola.nama_gedung}</td>
                    <td className="px-6 py-4">{pengelola.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {pengelola.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex flex-row gap-x-2">
                      {
                        // Invoke function to check if user has reached max buildings
                        (() => {
                          // Count how many different setting_ids this username has
                          const userSettingIds = pengelolaList
                            .filter(
                              (p: IPengelolaGedung) =>
                                p.username === pengelola.username
                            )
                            .map((p: IPengelolaGedung) => p.setting_id);

                          const uniqueSettingIds = [...new Set(userSettingIds)];

                          // Only show edit button if user hasn't reached max buildings
                          return (
                            uniqueSettingIds.length <
                            (Array.isArray(settings) ? settings.length : 1)
                          );
                        })() && (
                          <Button
                            color="blue"
                            size="xs"
                            onClick={() => handleEdit(pengelola)}
                            className="transition-colors duration-200">
                            Edit
                          </Button>
                        )
                      }

                      {isAdmin && (
                        <Button
                          color="red"
                          size="xs"
                          onClick={() => handleDelete(pengelola)}
                          className="transition-colors duration-200">
                          Hapus
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  Tidak ada pengelola gedung ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{" "}
      {/* Modal Edit Pengelola */}
      {openModal.editModal && selectedPengelola && (
        <EditPengelolaModal
          openModal={openModal.editModal}
          setOpenModal={(open: boolean) =>
            setOpenModal((prev) => ({ ...prev, editModal: open }))
          }
          pengelola={selectedPengelola}
        />
      )}
      {/* Modal Delete Pengelola */}
      {openModal.deleteModal && selectedPengelola && (
        <DeletePengelolaModal
          openModal={openModal.deleteModal}
          setOpenModal={(open: boolean) =>
            setOpenModal((prev) => ({ ...prev, deleteModal: open }))
          }
          userId={selectedPengelola.id}
          username={selectedPengelola.username}
        />
      )}
    </>
  );
}
