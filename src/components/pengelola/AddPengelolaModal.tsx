import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { usePengelola } from "../../states/pengelola";
import { useSettings } from "../../states/settings";
import { useUsers } from "../../states/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISettings } from "../../types/settings";

const addPengelolaSchema = z.object({
  id_user: z.number().min(1, "User harus dipilih"),
  id_setting: z.number().min(1, "Gedung harus dipilih"),
});

type AddPengelolaFormData = z.infer<typeof addPengelolaSchema>;

interface AddPengelolaModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function AddPengelolaModal({
  openModal,
  setOpenModal,
}: AddPengelolaModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddPengelolaFormData>({
    resolver: zodResolver(addPengelolaSchema),
    defaultValues: {
      id_user: 0,
      id_setting: 0,
    },
  });

  const createPengelolaGedung = usePengelola(
    (state) => state.createPengelolaGedung
  );
  const settings = useSettings((state) => state.settings);
  const users = useUsers((state) => state.users);

  async function handleFormSubmit(data: AddPengelolaFormData) {
    try {
      await createPengelolaGedung(data);
      setOpenModal(false);
      reset();
    } catch (e) {
      console.error(e);
    }
  }

  const handleClose = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <Modal show={openModal} size="md" popup onClose={handleClose}>
      <ModalHeader className="p-3">Tambah Pengelola Gedung</ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* User Selection */}
            <div>
              <label
                htmlFor="id_user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pilih User
              </label>
              <select
                {...register("id_user", { valueAsNumber: true })}
                id="id_user"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.id_user ? "border-red-300" : "border-gray-300"
                }`}>
                <option value={0}>Pilih User</option>
                {users &&
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} - {user.email}
                    </option>
                  ))}
              </select>
              {errors.id_user && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.id_user.message}
                </p>
              )}
            </div>

            {/* Building Selection */}
            <div>
              <label
                htmlFor="id_setting"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pilih Gedung
              </label>
              <select
                {...register("id_setting", { valueAsNumber: true })}
                id="id_setting"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.id_setting ? "border-red-300" : "border-gray-300"
                }`}>
                <option value={0}>Pilih Gedung</option>
                {settings &&
                  Array.isArray(settings) &&
                  settings.map((setting: ISettings) => (
                    <option key={setting.id} value={setting.id}>
                      {setting.nama_gedung}
                    </option>
                  ))}
              </select>
              {errors.id_setting && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.id_setting.message}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                color="gray"
                className="flex-1"
                onClick={handleClose}
                disabled={isSubmitting}>
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary-400 hover:bg-primary-500"
                disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Tambah Pengelola"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
