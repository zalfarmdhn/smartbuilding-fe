import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useUsers } from "../../states/users";
import { IUser } from "../../types/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const editUserSchema = z.object({
  id: z.number(),
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().optional(),
  role: z.enum(["admin", "pengelola", "manajement"], { 
    invalid_type_error: "Role harus diisi",
    required_error: "Role harus diisi",
  }),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface EditUserModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedUser: IUser;
}

export function EditUserModal({ 
  openModal, 
  setOpenModal, 
  selectedUser 
}: EditUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
  });

  const updateUser = useUsers((state) => state.updateUser);

  // Set form values when selectedUser changes
  useEffect(() => {
    if (selectedUser && openModal) {
      setValue("id", selectedUser.id);
      setValue("username", selectedUser.username);
      setValue("email", selectedUser.email);
      setValue("password", "");
      setValue("role", selectedUser.role as "admin" | "pengelola" | "manajement");
    }
  }, [selectedUser, openModal, setValue]);

  async function handleFormSubmit(data: EditUserFormData) {
    try {
      await updateUser(
        data.id,
        data.username,
        data.email,
        data.password === "" ? selectedUser.password || "" : data.password || "",
        data.role
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
          Edit User
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="pb-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Hidden ID field */}
            <input type="hidden" {...register("id")} />

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
                placeholder="user@gmail.com"
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
                placeholder=""
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Biarkan kosong jika tidak ingin mengubah password
              </p>
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
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
