import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Info } from "lucide-react";
import { useSettings } from "../../states/settings";

interface IDeleteModal {
  openModal: boolean;
  idBangunan: number;
  namaBangunan: string;
  setOpenModal: (open: boolean) => void;
  // handleDelete: (id: number) => void;
}

export function DeleteSettingModal({
  openModal,
  setOpenModal,
  idBangunan,
  namaBangunan,
}: IDeleteModal) {
  const deleteSetting = useSettings((state) => state.deleteSetting);

  const handleDelete = (id: number) => {
    deleteSetting(id);
    setOpenModal(false);
  };

  return (
    <>
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
              Apakah kamu yakin ingin mendelete bangunan {namaBangunan}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDelete(idBangunan);
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
    </>
  );
}
