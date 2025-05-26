import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { usePengelola } from "../../states/pengelola";
import { IPengelolaGedung } from "../../types/pengelola";
import { useSettings } from "../../states/settings";
import { useUsers } from "../../states/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ISettings } from "../../services/settings";

const editPengelolaSchema = z.object({
  id: z.number(),
  id_user: z.number().min(1, "User harus dipilih"),
  id_setting: z.number().min(1, "Gedung harus dipilih"),
});

type EditPengelolaFormData = z.infer<typeof editPengelolaSchema>;

interface EditPengelolaModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  pengelola: IPengelolaGedung;
}

export function EditPengelolaModal({ 
  openModal, 
  setOpenModal, 
  pengelola 
}: EditPengelolaModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditPengelolaFormData>({
    resolver: zodResolver(editPengelolaSchema),
  });

  const updatePengelolaGedung = usePengelola(
    (state) => state.updatePengelolaGedung
  );
  const settings = useSettings((state) => state.settings);
  const users = useUsers((state) => state.users);

  // Set form values when pengelola changes
  useEffect(() => {
    if (pengelola && users && openModal) {
      // Find the user ID by matching username
      const user = users.find((u) => u.username === pengelola.username);
      setValue("id", pengelola.id);
      setValue("id_user", user ? user.id : 0);
      setValue("id_setting", pengelola.setting_id);
    }
  }, [pengelola, users, openModal, setValue]);

  async function handleFormSubmit(data: EditPengelolaFormData) {
    try {
      await updatePengelolaGedung(data.id, {
        id_user: data.id_user,
        id_setting: data.id_setting,
      });
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
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Edit Pengelola Gedung
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Hidden ID field */}
            <input type="hidden" {...register("id")} />

            {/* User Selection - Disabled in edit mode */}
            <div>
              <label
                htmlFor="id_user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User
              </label>
              <select
                {...register("id_user", { valueAsNumber: true })}
                id="id_user"
                disabled
                className={`bg-gray-100 border text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed ${
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
                <p className="text-red-500 text-sm mt-1">{errors.id_user.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                User tidak dapat diubah saat edit
              </p>
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
                <p className="text-red-500 text-sm mt-1">{errors.id_setting.message}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <Button 
                type="button" 
                color="gray" 
                className="flex-1"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary-400 hover:bg-primary-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
