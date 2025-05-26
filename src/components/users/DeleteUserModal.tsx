import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Info } from "lucide-react";
import { useUsers } from "../../states/users";

interface IDeleteModal {
  openModal: boolean;
  userId: number;
  username: string;
  setOpenModal: (open: boolean) => void;
}

export function DeleteUserModal({
  openModal,
  setOpenModal,
  userId,
  username,
}: IDeleteModal) {
  const deleteUser = useUsers((state) => state.deleteUser);

  const handleDelete = (id: number) => {
    deleteUser(id);
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
              Apakah kamu yakin ingin menghapus pengguna {username}?
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
    </>
  );
}
