import { useState } from "react";
import { useWaterMonitoring } from "../states/water-monitoring";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts"
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

export default function WaterMonitoringPage() {
  const [loading, setIsLoading] = useState(true);

  const waterData = useWaterMonitoring((state) => state.waterData);
  const waterChart = useWaterMonitoring((state) => state.waterChart);

  console.log(waterChart);

  const dataDummy = {
    "dataPenggunaanMingguan": {
        "Minggu 4": [
            {
                "pipa": "klinik",
                "volume": "42 L"
            },
            {
                "pipa": "pipa_5",
                "volume": "19 L"
            },
            {
                "pipa": "pipa_4",
                "volume": "0 L"
            },
            {
                "pipa": "pipa_1",
                "volume": "35 L"
            },
            {
                "pipa": "pipa_7",
                "volume": "74 L"
            },
            {
                "pipa": "kantin",
                "volume": "173 L"
            },
            {
                "pipa": "pipa_6",
                "volume": "82 L"
            },
            {
                "pipa": "pipa_3",
                "volume": "246 L"
            },
            {
                "pipa": "pipa_2",
                "volume": "145 L"
            },
            {
                "pipa": "pipa_8",
                "volume": "12 L"
            },
            {
                "pipa": "pipa_air_masuk",
                "volume": "5701 L"
            }
        ],
        "Minggu 5": [
            {
                "pipa": "pipa_air_masuk",
                "volume": "3009 L"
            },
            {
                "pipa": "pipa_5",
                "volume": "8 L"
            },
            {
                "pipa": "pipa_4",
                "volume": "0 L"
            },
            {
                "pipa": "kantin",
                "volume": "144 L"
            },
            {
                "pipa": "pipa_7",
                "volume": "22 L"
            },
            {
                "pipa": "klinik",
                "volume": "19 L"
            },
            {
                "pipa": "pipa_1",
                "volume": "16 L"
            },
            {
                "pipa": "pipa_2",
                "volume": "120 L"
            },
            {
                "pipa": "pipa_3",
                "volume": "130 L"
            },
            {
                "pipa": "pipa_6",
                "volume": "10 L"
            },
            {
                "pipa": "pipa_8",
                "volume": "11 L"
            }
        ]
    },
}

  if (loading) {
    if (waterData) {
      setIsLoading(false)
    } else if(getDataTorenAir()) {
      setIsLoading(false);
    };
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Section Statistik Toren Air */}
      <div className="w-[806px] h-[442px] flex flex-col gap-4">
        <h1 className="text-primary-500 font-bold text-xl">
          Statistik Toren Air
        </h1>
        <div className="flex flex-row gap-6">
          {/* Card Toren */}
          <div className="flex w-[298px] h-[354px] bg-primary-400 p-4 rounded-lg shadow-md justify-center items-center">
            <TorenIcon />
            <h1 className="text-primary-200 absolute font-bold text-3xl">
              {waterData?.KapasitasToren ?? getSpecificDataToren("KapasitasToren")}
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
                      (1 - parseInt(waterData?.KapasitasToren || getSpecificDataToren("KapasitasToren")) / 100)
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
            {/* TODO : Ubah nilai default dari "0" menjadi nilai aktual dari data yang tersimpan sebelumnya di localStorage jika API kedua error */}
            <CardStatistic
              icon={<AirKeluarIcon />}
              heading="Air Keluar"
              value={waterData?.AirKeluar ?? getSpecificDataToren("AirKeluar")} />
            <CardStatistic
              icon={<AirMasukIcon />}
              heading="Air Masuk"
              value={waterData?.AirMasuk ?? getSpecificDataToren("AirMasuk")} />
            <CardStatistic
              icon={<IndikatorAirIcon />}
              heading="Indikator Level Air"
              value={waterData?.KapasitasToren ?? getSpecificDataToren("KapasitasToren")} />
          </div>
          {/* Card statistik 2 */}
          <div className="h-[354px] flex flex-col gap-4">
            <CardStatistic
              icon={<VolumeSensorIcon />}
              heading="Volume Sensor"
              value={waterData?.VolumeSensor ?? getSpecificDataToren("VolumeSensor")} />
            <CardStatistic
              icon={<WaterTankIcon />}
              heading="Water Tank"
              value={"5100 L"} />
            <CardStatistic
              icon={<ClockIcon />}
              heading="Terakhir Diupdate"
              value={formatDate(waterData?.UpdatedAt ?? getSpecificDataToren("UpdatedAt"))} />
          </div>
        </div>

      </div>
      {/* TODO: Buat chart untuk data kedua  */}
      {/* Section Chart Penggunaan Air */}
      <div className="w-[806px] mt-8">
        <h1 className="text-primary-500 font-bold text-xl mb-4">
          Grafik Penggunaan Air
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {['pipa_1', 'pipa_2', 'pipa_3', 'pipa_4', 'pipa_5', 'pipa_6', 'pipa_7', 'pipa_8', 'kantin', 'klinik'].map((pipa) => (
              <Line 
                key={pipa}
                type="monotone"
                dataKey={pipa}
                stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                strokeWidth={2}
              />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
