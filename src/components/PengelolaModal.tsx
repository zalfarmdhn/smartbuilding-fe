import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { usePengelola } from "../states/pengelola";
import { IPengelolaBody, IPengelolaGedung } from "../types/pengelola";
import { useSettings } from "../states/settings";
import { useUsers } from "../states/users";
import { ISettings } from "../services/settings";

interface IModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  pengelola?: IPengelolaGedung;
}

const defaultFormData = {
  id_user: 0,
  id_setting: 0,
};

export function PengelolaModal({ openModal, setOpenModal, pengelola }: IModal) {
  const [formData, setFormData] = useState<IPengelolaBody>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const createPengelolaGedung = usePengelola(
    (state) => state.createPengelolaGedung
  );
  const updatePengelolaGedung = usePengelola(
    (state) => state.updatePengelolaGedung
  );
  const settings = useSettings((state) => state.settings);
  const users = useUsers((state) => state.users);

  const isEditMode = !!pengelola;

  // Handle the fact that settings might be an array or single object
  const settingsArray = Array.isArray(settings)
    ? settings
    : settings
    ? [settings]
    : [];
  // Initialize form data for edit mode
  useEffect(() => {
    if (pengelola && users) {
      // Find the user ID by matching username
      const user = users.find((u) => u.username === pengelola.username);
      setFormData({
        id_user: user ? user.id : 0,
        id_setting: pengelola.setting_id,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [pengelola, users]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditMode && pengelola) {
        await updatePengelolaGedung(pengelola.id, formData);
      } else {
        await createPengelolaGedung(formData);
      }
      setOpenModal(false);
      setFormData(defaultFormData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      {" "}
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {isEditMode ? "Edit Pengelola Gedung" : "Tambah Pengelola Gedung"}
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="id_user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pilih User
              </label>
              <select
                id="id_user"
                name="id_user"
                value={formData.id_user}
                onChange={handleChange}
                disabled={isEditMode}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                required>
                <option value={0}>Pilih User</option>
                {users &&
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} - {user.email}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="id_setting"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pilih Gedung
              </label>
              <select
                id="id_setting"
                name="id_setting"
                value={formData.id_setting}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required>
                {" "}
                <option value={0}>Pilih Gedung</option>
                {settingsArray &&
                  settingsArray.map((setting: ISettings) => (
                    <option key={setting.id} value={setting.id}>
                      {setting.nama_gedung}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                color="gray"
                onClick={() => setOpenModal(false)}
                disabled={isLoading}>
                Batal
              </Button>{" "}
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary-400 hover:bg-primary-500">
                {isLoading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
