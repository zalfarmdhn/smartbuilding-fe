import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { useUsers } from "../states/users";
import { IUser } from "../types/users";
import { useSettings } from "../states/settings";

interface IModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  addMode?: boolean;
  selectedUser?: IUser;
}

const defaultFormData = {
  id: 0,
  username: "",
  email: "",
  password: "",
  role: "user",
  pengelola_gedung: [
    {
      setting_id: 0,
    },
  ],
};

export function UserModal({
  openModal,
  setOpenModal,
  addMode = false,
  selectedUser,
}: IModal) {
  const [formData, setFormData] = useState(
    addMode
      ? {
          ...defaultFormData,
        }
      : {
          ...selectedUser!,
          password: "",
          pengelola_gedung: selectedUser?.pengelola_gedung || [
            { setting_id: 0 },
          ],
        }
  );
  const [isLoading, setIsLoading] = useState(false);

  // console.log(`ini form data`, formData);

  const createUser = useUsers((state) => state.createUser);
  const updateUser = useUsers((state) => state.updateUser);
  const settings = useSettings((state) => state.settings);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUser(
        formData.id,
        formData.username,
        formData.email,
        formData.password === ""
          ? selectedUser?.password || ""
          : formData.password,
        formData.role
      );
      setOpenModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUser(
        formData.username,
        formData.email,
        formData.password,
        formData.role,
        formData.pengelola_gedung
      );
      setOpenModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {addMode ? "Add User" : "Edit User"}
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form
            onSubmit={addMode ? handleAdd : handleEdit}
            className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="user@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={
                  addMode
                    ? "Password"
                    : "Kosongkan jika tidak ingin mengubah password"
                }
                required={addMode} // Password required only in add mode
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required>
                <option value="null">Pilih Role</option>
                <option value="pengelola">Pengelola</option>
                <option value="admin">Admin</option>
                <option value="manajement">Management</option>
              </select>
            </div>

            {addMode && (
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Gedung
                </label>
                <select
                  id="gedung"
                  name="gedung"
                  value={formData.pengelola_gedung[0].setting_id}
                  onChange={(e) => {
                    const settingId = Number(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      pengelola_gedung: [{ setting_id: settingId }],
                    }));
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required>
                  <option value={0}>Pilih Gedung</option>
                  {Array.isArray(settings) ? (
                    settings.map((setting) => (
                      <option key={setting.id} value={setting.id}>
                        {setting.nama_gedung}
                      </option>
                    ))
                  ) : (
                    <option value="">No buildings available</option>
                  )}
                </select>
              </div>
            )}

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Loading..." : addMode ? "Add User" : "Save Changes"}
            </Button>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
