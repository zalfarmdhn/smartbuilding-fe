import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Info } from "lucide-react";
import { usePengelola } from "../states/pengelola";

interface IDeleteModal {
  openModal: boolean;
  userId: number;
  username: string;
  setOpenModal: (open: boolean) => void;
}

export function PengelolaDeleteModal({
  openModal,
  setOpenModal,
  userId,
  username,
}: IDeleteModal) {
  const deletePengelolaGedung = usePengelola((state) => state.deletePengelolaGedung);

  const handleDelete = (id: number) => {
    deletePengelolaGedung(id);
    setOpenModal(false);
  };

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <Info className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah kamu yakin ingin menghapus pengelola gedung {username}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                handleDelete(userId);
              }}>
              {"Ya, saya yakin"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Tidak, batalkan
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
