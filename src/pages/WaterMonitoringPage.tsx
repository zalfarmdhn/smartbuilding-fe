import { useState } from "react";
import { useWaterMonitoring } from "../states/water-monitoring";
import { formatDate } from "../utils/formatDate";
import TorenIcon from "../components/icons/toren-icon";
import CardStatistic from "../components/CardStatistic";
import AirKeluarIcon from "../components/icons/air-keluar-icon";
import AirMasukIcon from "../components/icons/air-masuk-icon";
import IndikatorAirIcon from "../components/icons/indicator-air-icon";
import VolumeSensorIcon from "../components/icons/volume-sensor-icon";
import WaterTankIcon from "../components/icons/water-tank-icon";
import ClockIcon from "../components/icons/clock-icon";
import { getDataTorenAir, getSpecificDataToren } from "../utils/backupData";
import { formatNumber } from "../utils/formatNumber";
import WaterGraph from "../components/WaterGraph";

export default function WaterMonitoringPage() {
  const [loading, setIsLoading] = useState(true);

  const waterData = useWaterMonitoring((state) => state.waterData);

  if (loading && waterData && getDataTorenAir()) {
    setIsLoading(false);
    return <p>Loading...</p>;
  }

  const fixedWaterToren = `${Math.floor(
    parseInt(
      waterData?.KapasitasToren ?? getSpecificDataToren("KapasitasToren")
    )
  )}%`;

  return (
    <>
      {/* Section Statistik Toren Air */}
      <div className="w-[806px] h-full flex flex-col gap-4 mx-auto">
        <h1 className="text-primary-500 font-bold text-xl">
          Statistik Toren Air
        </h1>
        <div className="flex flex-row gap-6">
          {/* Card Toren */}
          <div className="flex w-[298px] h-[354px] bg-primary-400 p-4 rounded-lg shadow-md justify-center items-center">
            <TorenIcon />
            <h1 className="text-primary-200 absolute font-bold text-3xl">
              {fixedWaterToren ?? getSpecificDataToren("KapasitasToren")}
            </h1>
            <div className="absolute w-[200px] h-[200px]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-primary-200 opacity-25"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="5"
                />
                <circle
                  className="stroke-primary-200"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    // Membuat lingkaran putus-putus dengan total keliling 2πr (dimana r=45)
                    // Rumus ini menghitung panjang garis putus-putus dalam lingkaran
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    // Mengontrol seberapa banyak lingkaran yang terlihat berdasarkan persentase kapasitas air
                    // Penjelasan rumus:
                    // 1. Hitung keliling penuh (2 * PI * 45)
                    // 2. Kalikan dengan (1 - kapasitasAir/100)
                    // 3. Kapasitas rendah = offset lebih besar = lingkaran terlihat lebih sedikit
                    // 4. Kapasitas tinggi = offset lebih kecil = lingkaran terlihat lebih banyak
                    strokeDashoffset: String(
                      2 *
                        Math.PI *
                        45 *
                        (1 -
                          parseInt(
                            fixedWaterToren ||
                              getSpecificDataToren("KapasitasToren")
                          ) /
                            100)
                    ),
                    // Memutar lingkaran 90 derajat berlawanan arah jarum jam
                    // Ini biasanya memposisikan bagian "kosong" dari lingkaran di bagian atas
                    transform: "rotate(-90deg)",
                    // Mengatur titik pusat untuk rotasi
                    // 50% 50% berarti putar di sekitar pusat elemen
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>
            </div>
          </div>
          {/* Card statistik 1 */}
          <div className="h-[354px] flex flex-col gap-4">
            <CardStatistic
              icon={<AirKeluarIcon />}
              heading="Air Keluar"
              value={`${formatNumber(
                waterData?.AirKeluar ?? getSpecificDataToren("AirKeluar")
              )} L`}
            />
            <CardStatistic
              icon={<AirMasukIcon />}
              heading="Air Masuk"
              value={`${formatNumber(
                waterData?.AirMasuk ?? getSpecificDataToren("AirMasuk")
              )} L`}
            />
            <CardStatistic
              icon={<IndikatorAirIcon />}
              heading="Indikator Level Air"
              value={fixedWaterToren ?? getSpecificDataToren("KapasitasToren")}
            />
          </div>
          {/* Card statistik 2 */}
          <div className="h-[354px] flex flex-col gap-4">
            <CardStatistic
              icon={<VolumeSensorIcon />}
              heading="Volume Air"
              value={`${formatNumber(
                waterData?.VolumeSensor ?? getSpecificDataToren("VolumeSensor")
              )} L`}
            />
            <CardStatistic
              icon={<WaterTankIcon />}
              heading="Water Tank"
              value={"5100 L"}
            />
            <CardStatistic
              icon={<ClockIcon />}
              heading="Terakhir Diupdate"
              value={formatDate(
                waterData?.UpdatedAt ?? getSpecificDataToren("UpdatedAt")
              )}
            />
          </div>
        </div>
      </div>
      {/* Section Chart Penggunaan Air */}
      <WaterGraph />
    </>
  );
}
