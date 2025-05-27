import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSettings } from "../../states/settings";

interface ISetting {
  id: number;
  nama_gedung: string;
  harga_listrik: number;
  jenis_listrik: string;
  haos_url: string;
  haos_token: string;
  scheduler: number;
  data_toren?: Array<{ monitoring_name: string; kapasitas_toren: number }>;
}

const editSettingSchema = z.object({
  id: z.number(),
  nama_gedung: z.string().min(1, "Nama gedung harus diisi"),
  harga_listrik: z.number().min(0, "Harga listrik harus berupa angka positif"),
  jenis_listrik: z.enum(["3_phase", "1_phase"], {
    invalid_type_error: "Jenis listrik harus dipilih",
    required_error: "Jenis listrik harus dipilih",
  }),
  haos_url: z
    .string()
    .url("URL HAOS tidak valid")
    .min(1, "URL HAOS harus diisi"),
  haos_token: z.string().min(1, "Token HAOS harus diisi"),
  scheduler: z.number().min(1, "Scheduler harus berupa angka positif"),
});

type EditSettingFormData = z.infer<typeof editSettingSchema>;

interface EditSettingModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedSetting: ISetting;
}

export function EditSettingModal({
  openModal,
  setOpenModal,
  selectedSetting,
}: EditSettingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditSettingFormData>({
    resolver: zodResolver(editSettingSchema),
  });

  const putSettings = useSettings((state) => state.putSettings);

  // Set form values when selectedSetting changes
  useEffect(() => {
    if (selectedSetting && openModal) {
      setValue("id", selectedSetting.id);
      setValue("nama_gedung", selectedSetting.nama_gedung);
      setValue("harga_listrik", selectedSetting.harga_listrik);
      setValue(
        "jenis_listrik",
        selectedSetting.jenis_listrik as "3_phase" | "1_phase"
      );
      setValue("haos_url", selectedSetting.haos_url);
      setValue("haos_token", selectedSetting.haos_token);
      setValue("scheduler", selectedSetting.scheduler);
    }
  }, [selectedSetting, openModal, setValue]);

  async function handleFormSubmit(data: EditSettingFormData) {
    try {
      await putSettings(
        data.id,
        data.nama_gedung,
        data.harga_listrik,
        data.haos_url,
        data.jenis_listrik,
        data.haos_token,
        data.scheduler
      );
      reset();
      setOpenModal(false);
    } catch (e) {
      console.error(e);
    }
  }

  const handleClose = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <Modal show={openModal} size="xl" popup onClose={handleClose}>
      <ModalHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Edit Setting Gedung
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Hidden ID field */}
            <input type="hidden" {...register("id")} />

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
                <p className="text-red-500 text-sm mt-1">
                  {errors.nama_gedung.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.harga_listrik.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.jenis_listrik.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.haos_url.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.haos_token.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.scheduler.message}
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
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}
