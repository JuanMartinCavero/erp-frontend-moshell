import axiosClient from "./axiosClient";

export const nextPhase = async (id) => {
  const res = await axiosClient.post(`/production/${id}/next-phase`);
  return res.data;
};