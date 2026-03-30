export default function ClientRow({ cliente, onDelete, onActivate, onEdit }) {
  return (
    <tr className="border-b">
      <td className="p-4">{cliente.nombre}</td>

      <td className="p-4">
        {cliente.tipo_identificacion} - {cliente.identificacion_fiscal}
      </td>

      <td className="p-4">{cliente.pais}</td>

      <td className="p-4">
        <span
          className={`px-2 py-1 rounded text-xs ${
            cliente.estado
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {cliente.estado === true ? "Activo" : "Inactivo"}{" "}
        </span>
      </td>

      <td className="p-4 flex gap-2">
        <button onClick={() => onEdit(cliente)} className="text-blue-500">
          Editar
        </button>

        {cliente.estado ? (
          <button onClick={() => onDelete(cliente.id)} className="text-red-500">
            Desactivar
          </button>
        ) : (
          <button
            onClick={() => onActivate(cliente.id)}
            className="text-green-500"
          >
            Activar
          </button>
        )}
      </td>
    </tr>
  );
}
