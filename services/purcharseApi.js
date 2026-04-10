import axiosClient from "./axiosClient"

export const ComprasKpi = async () => {
    const response = await axiosClient.get("/ordenes-compra/kpis")
    return response.data
}