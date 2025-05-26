import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { useUsers } from "../states/users";
import { IUser } from "../types/users";
import { EditUserModal } from "./users/EditUserModal";
import { DeleteUserModal } from "./users/DeleteUserModal";

interface ModalState {
  editModal: boolean;
  deleteModal: boolean;
  addModal: boolean;
}

export default function UserTableComponent(): JSX.Element {
  const [openModal, setOpenModal] = useState<ModalState>({
    editModal: false,
    deleteModal: false,
    addModal: false,
  });
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const users = useUsers((state) => state.users);
  const loading = useUsers((state) => state.loading);

  const isAdmin = true;

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setOpenModal((prev) => ({
      ...prev,
      editModal: true,
    }));
  };

  const handleDelete = (user: IUser) => {
    setSelectedUser(user);
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
            {users instanceof Array ? (
              users.map((user: IUser, index: number) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-row gap-x-2">
                    <Button
                      color="blue"
                      size="xs"
                      onClick={() => handleEdit(user)}
                      className="transition-colors duration-200">
                      Edit
                    </Button>
                    {isAdmin && (
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(user)}
                        className="transition-colors duration-200 bg-red-100 text-white">
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{" "}
      {/* Modal Edit User */}
      {openModal.editModal && selectedUser && (
        <div className="modal">
          <EditUserModal
            openModal={openModal.editModal}
            setOpenModal={(value) =>
              setOpenModal((prev) => ({ ...prev, editModal: value }))
            }
            selectedUser={selectedUser}
          />
        </div>
      )}
      {/* Modal Delete User */}
      {openModal.deleteModal && selectedUser && (
        <div className="modal">
          <DeleteUserModal
            openModal={openModal.deleteModal}
            setOpenModal={(value) =>
              setOpenModal((prev) => ({ ...prev, deleteModal: value }))
            }
            userId={selectedUser.id}
            username={selectedUser.username}
          />
        </div>
      )}
    </>
  );
}
