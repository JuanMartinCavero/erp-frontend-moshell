import BarcodeGenerate from "../components/BarcodeGenerate";
import BarcodeScan from "../components/BarcodeScan";
import BarcodeTable from "../components/BarcodeTable";

export default function BarcodePage() {
  return (
    <div className="p-8 space-y-8 w-full">
      <div>
        <h2 className="text-xl font-bold">
          Gestión de Etiquetas y Escaneo de Materiales
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <BarcodeGenerate />
        <BarcodeScan />
      </div>

      <BarcodeTable />
    </div>
  );
}
