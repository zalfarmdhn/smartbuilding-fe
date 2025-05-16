const db = window.localStorage;

export const setDataMonitoring = ( dataToren: string ) => {
  db.setItem("dataTorenAir", dataToren);
}

export const setDataSetting = ( dataSetting: string ) => {
  db.setItem("dataSetting", dataSetting);
}

export const setDataUser = (user: object) => {
  db.setItem("dataUser", JSON.stringify(user));
}

export const setDataListrik = ( dataListrik: string ) => {
  db.setItem("dataListrik", dataListrik);
}

export const setIdBangunan = ( idBangunan: string ) => {
  db.setItem("idBangunan", idBangunan);
}

export const getIdBangunan = () => {
  return db.getItem("idBangunan");
}

export const getDataSetting = () => {
  const dataSetting = db.getItem("dataSetting");
  return dataSetting !== null ? JSON.parse(dataSetting) : null;
}

export const getDataUser = () => {
  const user = db.getItem("user");
  return user !== null ? JSON.parse(user) : null;
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

export const removeAllData = () => {
  db.removeItem("dataTorenAir");
  db.removeItem("dataSetting");
  db.removeItem("dataUser");
  db.removeItem("dataListrik");
  db.removeItem("idBangunan");
  db.removeItem("token");
}