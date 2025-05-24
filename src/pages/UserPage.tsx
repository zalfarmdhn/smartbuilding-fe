import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import UserTableComponent from "../components/UserTableComponent";
import { UserModal } from "../components/UserModal";
import { useUsers } from "../states/users";
import { useNavigate } from "react-router";
import { useSettings } from "../states/settings";

export default function UserPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const getUsers = useUsers((state) => state.getUsers);
  const user = useSettings((state) => state.dataUser);
  const navigate = useNavigate();

  if(user?.data.role !== "admin") {
    navigate("/");
  }

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    document.title = "Smartbuilding | Users";
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-2 md:p-3 sm:p-1">
        <div className="flex flex-col">
          <h2 className="text-primary-500 font-bold text-xl md:text-2xl">
            Pengguna
          </h2>
          <p className="text-gray-600 mt-1">
            Kelola semua pengguna sistem di sini.
          </p>
        </div>
        <Button
          size="xs"
          className="bg-primary-400 hover:bg-primary-500 text-white px-4 py-2 rounded-md"
          onClick={() => setOpenModal(true)}>
          Tambah Pengguna
        </Button>
      </div>
      {openModal && (
        <UserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          addMode={true}
        />
      )}
      <UserTableComponent />
    </div>
  );
}