import { useOutletContext } from 'react-router-dom';

const AdminUsers = () => {
  const { users } = useOutletContext();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">👥 Gestión de usuarios</h3>
        <span className="badge bg-info">{users.length} registrados</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.correo}>
                  <td>{index + 1}</td>
                  <td>
                    {user.nombre} {user.apellidos}
                  </td>
                  <td>{user.correo}</td>
                  <td>
                    {user.descuento ? (
                      <span className="badge bg-success">{user.descuento}%</span>
                    ) : (
                      <span className="badge bg-primary">Usuario</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
