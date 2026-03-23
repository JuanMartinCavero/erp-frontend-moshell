const UserStats = ({ users }) => {

  const total = users.length;

  const activos = users.filter(
    u => u.estado === 1
  ).length;

  const inactivos = users.filter(
    u => u.estado === 0
  ).length;

  return (

    <div className="grid grid-cols-3 gap-4">

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">
          Total Usuarios
        </p>
        <p className="text-2xl font-bold">
          {total}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">
          Usuarios Activos
        </p>
        <p className="text-2xl font-bold text-green-600">
          {activos}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">
          Usuarios Inactivos
        </p>
        <p className="text-2xl font-bold text-red-500">
          {inactivos}
        </p>
      </div>

    </div>

  );
};

export default UserStats;