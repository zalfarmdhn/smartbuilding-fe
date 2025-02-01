/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Electricity {
  TotalWatt: string
  TotalDayaListrikLT1: string
  TotalDayaListrikLT2: string
  TotalDayaListrikLT3: string
  TotalDayaListrikLT4: string
  BiayaPemakaianLT1: string
  BiayaPemakaianLT2: string
  BiayaPemakaianLT3: string
  BiayaPemakaianLT4: string
  DataPenggunaanListrikHarian: DataPenggunaanListrikHarian
  DataBiayaListrikHarian: DataBiayaListrikHarian
  DataPenggunaanListrikMingguan: DataPenggunaanListrikMingguan
  DataBiayaListrikMingguan: DataBiayaListrikMingguan
  DataPenggunaanListrikTahunan: DataPenggunaanListrikTahunan
  DataBiayaListrikTahunan: DataBiayaListrikTahunan
  CreatedAt: string
  UpdatedAt: string
}

export interface DataPenggunaanListrikHarian {}

export interface DataBiayaListrikHarian {}

export interface DataPenggunaanListrikMingguan {
  [key: `Minggu ${number}`]: Array<{
    Lantai: number
    Biaya: string
  }>
}

export interface DataBiayaListrikMingguan {
  [key: `Minggu ${number}`]: Array<{
    Lantai: number
    Biaya: string
  }>
}

export interface DataPenggunaanListrikTahunan {
  [key: string]: Array<{
    Lantai: number
    Value: string
  }>
}

export interface DataBiayaListrikTahunan {
  [key: string]: Array<{
    Lantai: number
    Biaya: string
  }>
}
