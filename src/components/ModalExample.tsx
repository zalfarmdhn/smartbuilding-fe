import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, FormEvent, ChangeEvent } from "react";
import { putSettings } from "../services/settings"; // Add addSetting import
import { useSettings } from "../states/settings";

interface ISetting {
  id: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  data_toren: Array<{ monitoring_name: string; kapasitas_toren: number }>;
}

interface IModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  addMode?: boolean;
  selectedSetting?: ISetting;
}

const defaultFormData: ISetting = {
  id: 0,
  nama_gedung: "",
  harga_listrik: 0,
  jenis_listrik: "3_phase",
  haos_url: "",
  haos_token: "",
  scheduler: 30,
  data_toren: [],
};

export function ModalExample({
  openModal,
  setOpenModal,
  addMode = false,
  selectedSetting,
}: IModal) {
  const [formData, setFormData] = useState(
    addMode ? defaultFormData : selectedSetting!
  );
  const [isLoading, setIsLoading] = useState(false);

  const addSetting = useSettings((state) => state.addSetting);

  console.log(formData);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddToren() {
    setFormData((prev) => ({
      ...prev,
      data_toren: [
        ...prev.data_toren,
        { monitoring_name: "", kapasitas_toren: 0 },
      ],
    }));
  }

  function handleTorenChange(
    index: number,
    field: string,
    value: string | number
  ) {
    setFormData((prev) => {
      const newDataToren = [...prev.data_toren];
      newDataToren[index] = {
        ...newDataToren[index],
        [field]: value,
      };
      return {
        ...prev,
        data_toren: newDataToren,
      };
    });
  }

  async function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await putSettings(
        formData.id,
        formData.nama_gedung,
        formData.harga_listrik,
        formData.haos_url,
        formData.jenis_listrik,
        formData.haos_token,
        formData.scheduler
      );
      setOpenModal(false);
      // window.location.reload();
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
      await addSetting(
        formData.nama_gedung,
        Number(formData.harga_listrik),
        formData.haos_url,
        formData.jenis_listrik,
        formData.haos_token,
        formData.scheduler,
        formData.data_toren
      );
      setOpenModal(false);
      // window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {addMode ? "Add Settings" : "Edit Settings"}
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form
            onSubmit={addMode ? handleAdd : handleEdit}
            className="space-y-6">
            <div>
              <label
                htmlFor="namaGedung"
                className="block mb-2 text-sm font-medium text-gray-900">
                Nama Gedung
              </label>
              <input
                type="text"
                id="namaGedung"
                name="nama_gedung"
                value={formData.nama_gedung}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Gedung"
                required
              />
            </div>

            <div>
              <label
                htmlFor="hargaListrik"
                className="block mb-2 text-sm font-medium text-gray-900">
                Harga Listrik
              </label>
              <input
                type="number"
                id="hargaListrik"
                name="harga_listrik"
                value={formData.harga_listrik}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Harga Listrik per kWh"
                required
              />
            </div>

            <div>
              <label
                htmlFor="jenisListrik"
                className="block mb-2 text-sm font-medium text-gray-900">
                Jenis Listrik
              </label>
              <select
                id="jenisListrik"
                name="jenis_listrik"
                value={formData.jenis_listrik}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required>
                <option value="3_phase">3 Phase</option>
                <option value="1_phase">1 Phase</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="haosUrl"
                className="block mb-2 text-sm font-medium text-gray-900">
                HAOS URL
              </label>
              <input
                type="text"
                id="haosUrl"
                name="haos_url"
                value={formData.haos_url}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="http://your-haos-url"
                required
              />
            </div>

            <div>
              <label
                htmlFor="haosToken"
                className="block mb-2 text-sm font-medium text-gray-900">
                HAOS Token
              </label>
              <input
                type="text"
                id="haosToken"
                name="haos_token"
                value={formData.haos_token}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your HAOS token"
                required
              />
            </div>

            <div>
              <label
                htmlFor="scheduler"
                className="block mb-2 text-sm font-medium text-gray-900">
                Schedule Time (dalam detik)
              </label>
              <input
                type="number"
                id="scheduler"
                name="scheduler"
                value={formData.scheduler}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="30"
                required
              />
            </div>

            {addMode && (
              <div className="space-y-4">
              <Button type="button" onClick={handleAddToren} className="w-full">
                + Add Toren
              </Button>

              {formData.data_toren.map((toren, index) => (
                <div key={index} className="space-y-4 p-4 border rounded">
                <div>
                  <label
                  htmlFor={`namaToren${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Nama Toren
                  </label>
                  <input
                  type="text"
                  id={`namaToren${index}`}
                  value={toren.monitoring_name}
                  onChange={(e) =>
                    handleTorenChange(
                    index,
                    "monitoring_name",
                    e.target.value
                    )
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  />
                </div>
                <div>
                  <label
                  htmlFor={`kapasitasToren${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Kapasitas Toren
                  </label>
                  <input
                  type="number"
                  id={`kapasitasToren${index}`}
                  onChange={(e) =>
                    handleTorenChange(
                    index,
                    "kapasitas_toren",
                    Number(e.target.value)
                    )
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  />
                </div>
                </div>
              ))}
              </div>
            )}

            <Button disabled={isLoading} type="submit">
              {isLoading ? "Loading.." : "Save Setting"}
            </Button>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
