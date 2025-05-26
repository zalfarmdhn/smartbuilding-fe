import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useSettings } from "../../states/settings";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addSettingSchema = z.object({
  nama_gedung: z.string().min(1, "Nama gedung harus diisi"),
  harga_listrik: z.number().min(0, "Harga listrik harus berupa angka positif"),
  jenis_listrik: z.enum(["3_phase", "1_phase"], {
    invalid_type_error: "Jenis listrik harus dipilih",
    required_error: "Jenis listrik harus dipilih",
  }),
  haos_url: z.string().url("URL HAOS tidak valid").min(1, "URL HAOS harus diisi"),
  haos_token: z.string().min(1, "Token HAOS harus diisi"),
  scheduler: z.number().min(1, "Scheduler harus berupa angka positif"),
  data_toren: z.array(
    z.object({
      monitoring_name: z.string().min(1, "Nama monitoring harus diisi"),
      kapasitas_toren: z.number().min(1, "Kapasitas toren harus diisi"),
    })
  ).optional(),
});

type AddSettingFormData = z.infer<typeof addSettingSchema>;

interface AddSettingModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function AddSettingModal({ 
  openModal, 
  setOpenModal 
}: AddSettingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddSettingFormData>({
    resolver: zodResolver(addSettingSchema),
    defaultValues: {
      nama_gedung: "",
      harga_listrik: 0,
      jenis_listrik: "3_phase",
      haos_url: "",
      haos_token: "",
      scheduler: 30,
      data_toren: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data_toren",
  });

  const addSetting = useSettings((state) => state.addSetting);

  async function handleFormSubmit(data: AddSettingFormData) {
    try {
      await addSetting(
        data.nama_gedung,
        data.harga_listrik,
        data.haos_url,
        data.jenis_listrik,
        data.haos_token,
        data.scheduler,
        data.data_toren || []
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

  const handleAddToren = () => {
    append({ monitoring_name: "", kapasitas_toren: 0 });
  };

  return (
    <Modal show={openModal} size="xl" popup onClose={handleClose}>
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tambah Setting Gedung
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Nama Gedung */}
            <div>
              <label
                htmlFor="nama_gedung"
                className="block mb-2 text-sm font-medium text-gray-900">
                Nama Gedung
              </label>
              <input
                {...register("nama_gedung")}
                type="text"
                id="nama_gedung"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.nama_gedung ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan nama gedung"
              />
              {errors.nama_gedung && (
                <p className="text-red-500 text-sm mt-1">{errors.nama_gedung.message}</p>
              )}
            </div>

            {/* Harga Listrik */}
            <div>
              <label
                htmlFor="harga_listrik"
                className="block mb-2 text-sm font-medium text-gray-900">
                Harga Listrik (per kWh)
              </label>
              <input
                {...register("harga_listrik", { valueAsNumber: true })}
                type="number"
                id="harga_listrik"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.harga_listrik ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan harga listrik"
              />
              {errors.harga_listrik && (
                <p className="text-red-500 text-sm mt-1">{errors.harga_listrik.message}</p>
              )}
            </div>

            {/* Jenis Listrik */}
            <div>
              <label
                htmlFor="jenis_listrik"
                className="block mb-2 text-sm font-medium text-gray-900">
                Jenis Listrik
              </label>
              <select
                {...register("jenis_listrik")}
                id="jenis_listrik"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.jenis_listrik ? "border-red-300" : "border-gray-300"
                }`}>
                <option value="3_phase">3 Phase</option>
                <option value="1_phase">1 Phase</option>
              </select>
              {errors.jenis_listrik && (
                <p className="text-red-500 text-sm mt-1">{errors.jenis_listrik.message}</p>
              )}
            </div>

            {/* HAOS URL */}
            <div>
              <label
                htmlFor="haos_url"
                className="block mb-2 text-sm font-medium text-gray-900">
                HAOS URL
              </label>
              <input
                {...register("haos_url")}
                type="url"
                id="haos_url"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.haos_url ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="http://your-haos-url"
              />
              {errors.haos_url && (
                <p className="text-red-500 text-sm mt-1">{errors.haos_url.message}</p>
              )}
            </div>

            {/* HAOS Token */}
            <div>
              <label
                htmlFor="haos_token"
                className="block mb-2 text-sm font-medium text-gray-900">
                HAOS Token
              </label>
              <input
                {...register("haos_token")}
                type="text"
                id="haos_token"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.haos_token ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan HAOS token"
              />
              {errors.haos_token && (
                <p className="text-red-500 text-sm mt-1">{errors.haos_token.message}</p>
              )}
            </div>

            {/* Scheduler */}
            <div>
              <label
                htmlFor="scheduler"
                className="block mb-2 text-sm font-medium text-gray-900">
                Schedule Time (dalam detik)
              </label>
              <input
                {...register("scheduler", { valueAsNumber: true })}
                type="number"
                id="scheduler"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.scheduler ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="30"
              />
              {errors.scheduler && (
                <p className="text-red-500 text-sm mt-1">{errors.scheduler.message}</p>
              )}
            </div>

            {/* Data Toren Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Data Toren</h3>
                <Button 
                  type="button" 
                  onClick={handleAddToren} 
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  + Tambah Toren
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700">Toren {index + 1}</h4>
                    {fields.length > 0 && (
                      <Button
                        type="button"
                        size="xs"
                        color="failure"
                        onClick={() => remove(index)}
                      >
                        Hapus
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <label
                      htmlFor={`data_toren.${index}.monitoring_name`}
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Nama Toren
                    </label>
                    <input
                      {...register(`data_toren.${index}.monitoring_name`)}
                      type="text"
                      className={`bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        errors.data_toren?.[index]?.monitoring_name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Masukkan nama toren"
                    />
                    {errors.data_toren?.[index]?.monitoring_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.data_toren[index]?.monitoring_name?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label
                      htmlFor={`data_toren.${index}.kapasitas_toren`}
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Kapasitas Toren
                    </label>
                    <input
                      {...register(`data_toren.${index}.kapasitas_toren`, { valueAsNumber: true })}
                      type="number"
                      className={`bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        errors.data_toren?.[index]?.kapasitas_toren ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Masukkan kapasitas toren"
                    />
                    {errors.data_toren?.[index]?.kapasitas_toren && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.data_toren[index]?.kapasitas_toren?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
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
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Tambah Setting"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
