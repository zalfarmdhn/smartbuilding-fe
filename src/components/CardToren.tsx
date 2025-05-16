import { getSpecificDataToren } from "../utils/backupData";
import { formatDate } from "../utils/formatDate";
import { formatNumber } from "../utils/formatNumber";
import CardStatistic from "./CardStatistic";
import ClockIcon from "./icons/clock-icon";
import IndikatorAirIcon from "./icons/indicator-air-icon";
import TorenIcon from "./icons/toren-icon";
import VolumeSensorIcon from "./icons/volume-sensor-icon";
import WaterTankIcon from "./icons/water-tank-icon";

export interface ICardToren {
  torenTitle: string;
  torenPercentage: number | string;
  torenCapacity: number | string;
  sensorVolume: number | string;
  lastUpdated: string;
}

export const CardToren = ({
  torenTitle,
  torenPercentage,
  torenCapacity,
  sensorVolume,
  lastUpdated,
}: ICardToren) => {
  return (
    <div className="flex flex-col gap-4 border-2 border-primary-400 p-3 sm:p-4 rounded-lg">
      <h3 className="text-gray-800 opacity-60 font-medium text-base sm:text-lg">
        {torenTitle}
      </h3>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Card Toren */}
        <div className="flex flex-col w-full lg:w-[290px] h-[250px] lg:h-[354px] bg-primary-400 p-4 rounded-lg shadow-md justify-center items-center relative">
          <TorenIcon />
          <h1 className="text-primary-200 absolute font-bold text-2xl sm:text-3xl">
            {torenPercentage ?? getSpecificDataToren("KapasitasToren")}
          </h1>
          <div className="absolute w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px]">
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
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: String(
                    2 *
                      Math.PI *
                      45 *
                      (1 -
                        parseInt(
                          torenPercentage ||
                            getSpecificDataToren("KapasitasToren")
                        ) /
                          100)
                  ),
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
          </div>
        </div>
        {/* Card Statistik Wrapper */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Statistik Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <CardStatistic
              icon={<WaterTankIcon />}
              heading="Kapasitas Toren"
              value={`${formatNumber(
          torenCapacity ?? getSpecificDataToren("KapasitasToren")
              )} L`}
              className="flex-1"
            />
            <CardStatistic
              icon={<IndikatorAirIcon />}
              heading="Indikator Level Air"
              value={`${
          torenPercentage ?? getSpecificDataToren("KapasitasToren")
              }`}
              className="flex-1"
            />
          </div>
          {/* Statistik Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <CardStatistic
              icon={<VolumeSensorIcon />}
              heading="Volume Sensor"
              value={`${formatNumber(
          sensorVolume ?? getSpecificDataToren("VolumeSensor")
              )} L`}
              className="flex-1"
            />
            <CardStatistic
              icon={<ClockIcon />}
              heading="Terakhir Diperbarui"
              value={formatDate(
          lastUpdated ?? getSpecificDataToren("LastUpdated")
              )}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
