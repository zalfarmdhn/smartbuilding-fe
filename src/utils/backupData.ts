const db = window.localStorage;

export const setDataMonitoring = ( dataToren: string ) => {
  db.setItem("dataTorenAir", dataToren);
}

export const setDataListrik = ( dataListrik: string ) => {
  db.setItem("dataListrik", dataListrik);
}

export const getDataTorenAir = () => {
  const torenAir = db.getItem("dataTorenAir");
  return torenAir !== null ? JSON.parse(torenAir) : null;
}

export const getDataListrik = () => {
  const dataListrik = db.getItem("dataListrik");
  return dataListrik !== null ? JSON.parse(dataListrik) : null;
}

export const getSpecificDataToren = (target: string) => {
  const data = getDataTorenAir();
  return data[target];
}

export const getSpecificDataListrik = (target: string) => {
  const data = getDataListrik();
  return data[target];
}

export const hasDataTorenAir = () => {
  return getDataTorenAir() !== null;
}