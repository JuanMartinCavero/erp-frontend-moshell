import { useState } from "react";
import { useMachines } from "../../../hooks/useMachine";
import ModalMachine from "./ModalMachine";

export default function TableMachine() {
  const { machines, loading, addMachine, editMachine, removeMachine } =
    useMachines();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleCreate = () => {
    setSelectedMachine(null);
    setOpenModal(true);
  };

  const handleEdit = (machine) => {
    setSelectedMachine(machine);
    setOpenModal(true);
  };

  const handleSave = async (data) => {
    try {
      if (selectedMachine) {
        await editMachine(selectedMachine.id, data);
      } else {
        await addMachine(data);
      }

      setOpenModal(false);
      setSelectedMachine(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  const statusColor = {
    inhabilitado: "text-gray-500",
    "en funcionamiento": "text-emerald-500",
    mantenimiento: "text-orange-500",
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold">Maquinas</h3>

        <div className="flex gap-2">
          <button
            onClick={handleCreate}
            className="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg"
          >
            Agregar Máquina
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
              <th className="px-6 py-4">Código</th>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Externa</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {machines.map((machine) => (
              <tr key={machine.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold">{machine.code}</td>

                <td className="px-6 py-4">{machine.nombre}</td>

                <td className="px-6 py-4">{machine.tipo}</td>

                <td className="px-6 py-4">
                  {machine.is_external ? "Sí" : "No"}
                </td>

                <td
                  className={`px-6 py-4 font-semibold ${statusColor[machine.status]}`}
                >
                  {machine.status}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(machine)}
                    className="text-blue-500 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => removeMachine(machine.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalMachine
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        machine={selectedMachine}
      />
    </div>
  );
}
