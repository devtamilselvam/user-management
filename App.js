import { useState, useEffect } from "react";
import "./App.css";

const COMPANIES = ["Google", "Microsoft", "Amazon", "Netflix", "OpenAI"];

const EMPTY_USER = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "Male",
  company: "",
  role: "Viewer",
  address: "",
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(EMPTY_USER);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        firstName: "Alex",
        lastName: "Rivera",
        email: "alex@company.com",
        mobile: "9876543210",
        dob: "1992-05-10",
        gender: "Male",
        company: "Google",
        role: "Admin",
        address: "San Jose, CA",
      },
    ]);
  }, []);

  const openAdd = () => {
    setCurrentUser(EMPTY_USER);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const saveUser = () => {
    if (!currentUser.firstName || !currentUser.email) return;

    if (currentUser.id) {
      setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="page">
      <header className="header">
        <h2>User Management</h2>
        <button className="primaryBtn" onClick={openAdd}> Add User</button>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Company</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.gender}</td>
              <td>{u.dob}</td>
              <td>{u.company}</td>
              <td className={`role ${u.role.toLowerCase()}`}>{u.role}</td>
              <td>{u.address}</td>
              <td>
                <button className="editBtn" onClick={() => openEdit(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="overlay">
          <div className="modal">
            <h3>{currentUser.id ? "Edit User" : "Add User"}</h3>

            <div className="formGrid">
              <input className="input" placeholder="First Name"
                value={currentUser.firstName}
                onChange={e => setCurrentUser({ ...currentUser, firstName: e.target.value })}
              />
              <input className="input" placeholder="Last Name"
                value={currentUser.lastName}
                onChange={e => setCurrentUser({ ...currentUser, lastName: e.target.value })}
              />
              <input className="input" placeholder="Email"
                value={currentUser.email}
                onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
              <input className="input" placeholder="Mobile"
                value={currentUser.mobile}
                onChange={e => setCurrentUser({ ...currentUser, mobile: e.target.value })}
              />
              <input type="date" className="input"
                value={currentUser.dob}
                onChange={e => setCurrentUser({ ...currentUser, dob: e.target.value })}
              />
              <select className="input"
                value={currentUser.gender}
                onChange={e => setCurrentUser({ ...currentUser, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select className="input"
                value={currentUser.company}
                onChange={e => setCurrentUser({ ...currentUser, company: e.target.value })}
              >
                <option value="">Select Company</option>
                {COMPANIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="input"
                value={currentUser.role}
                onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
              >
                <option>Admin</option>
                <option>Contributor</option>
                <option>Viewer</option>
              </select>
            </div>

            <textarea
              className="input addressBox"
              placeholder="Address"
              value={currentUser.address}
              onChange={e => setCurrentUser({ ...currentUser, address: e.target.value })}
            />

            <div className="footer">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="primaryBtn" onClick={saveUser}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}