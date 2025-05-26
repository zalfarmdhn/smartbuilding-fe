import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useUsers } from "../../states/users";
import { useSettings } from "../../states/settings";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addUserSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: z.enum(["admin", "pengelola", "manajement"], { 
    invalid_type_error: "Role harus diisi",
    required_error: "Role harus diisi",
  }),
  pengelola_gedung: z
    .array(
      z.object({
        setting_id: z.number().min(1, "Gedung harus dipilih"),
      })
    )
    .min(1, "Minimal pilih satu gedung"),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

interface AddUserModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function AddUserModal({ openModal, setOpenModal }: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "pengelola",
      pengelola_gedung: [{ setting_id: 0 }],
    },
  });

  const createUser = useUsers((state) => state.createUser);
  const settings = useSettings((state) => state.settings);

  async function handleFormSubmit(data: AddUserFormData) {
    try {
      await createUser(
        data.username,
        data.email,
        data.password,
        data.role,
        data.pengelola_gedung
      );
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
          Tambah User Baru
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="username"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.username ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900">
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.role ? "border-red-300" : "border-gray-300"
                }`}>
                <option value="">Pilih Role</option>
                <option value="pengelola">Pengelola</option>
                <option value="admin">Admin</option>
                <option value="manajement">Management</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Gedung */}
            <div>
              <label
                htmlFor="gedung"
                className="block mb-2 text-sm font-medium text-gray-900">
                Gedung
              </label>
              <select
                {...register("pengelola_gedung.0.setting_id", { valueAsNumber: true })}
                id="gedung"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.pengelola_gedung?.[0]?.setting_id ? "border-red-300" : "border-gray-300"
                }`}>
                <option value={0}>Pilih Gedung</option>
                {Array.isArray(settings) ? (
                  settings.map((setting) => (
                    <option key={setting.id} value={setting.id}>
                      {setting.nama_gedung}
                    </option>
                  ))
                ) : (
                  <option value="">Tidak ada gedung tersedia</option>
                )}
              </select>
              {errors.pengelola_gedung?.[0]?.setting_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pengelola_gedung[0].setting_id.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
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
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Tambah User"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
