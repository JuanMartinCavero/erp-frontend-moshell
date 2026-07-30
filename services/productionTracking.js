import axiosClient from "./axiosClient";

export const nextPhase = async (id, quantityProduced= 0) => {
  const res = await axiosClient.post(`/production/${id}/next-phase`,{
    quantity_produced: quantityProduced
  });
  return res.data;
};