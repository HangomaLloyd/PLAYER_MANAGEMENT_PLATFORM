import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function fetchClubs() {
  return fetch("/api/auth/clubs").then((res) => res.json());
}

function addClub(data) {
  return fetch("/api/auth/clubs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function updateClub(id, data) {
  return fetch(`/api/auth/clubs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default function ClubsManagement() {
  const queryClient = useQueryClient();
  const { data: clubs = [], isLoading } = useQuery({ queryKey: ["clubs"], queryFn: fetchClubs });
  const addMutation = useMutation({
    mutationFn: addClub,
    onSuccess: () => queryClient.invalidateQueries(["clubs"]),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateClub(id, data),
    onSuccess: () => queryClient.invalidateQueries(["clubs"]),
  });
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editClub, setEditClub] = useState(null);
  const [form, setForm] = useState({
    clubName: "",
    clubDivision: "",
    province: "",
    adminName: "",
    email: "",
    phoneNumber: "",
  });

  const filteredClubs = clubs.filter((c) =>
    c.clubName?.toLowerCase().includes(search.toLowerCase()) ||
    c.province?.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    addMutation.mutate(form, {
      onSuccess: () => {
        setShowAdd(false);
        setForm({ clubName: "", clubDivision: "", province: "", adminName: "", email: "", phoneNumber: "" });
      },
    });
  }

  function handleEdit() {
    updateMutation.mutate({ id: editClub._id, ...form }, {
      onSuccess: () => {
        setShowEdit(false);
        setEditClub(null);
        setForm({ clubName: "", clubDivision: "", province: "", adminName: "", email: "", phoneNumber: "" });
      },
    });
  }

  function openEdit(club) {
    setEditClub(club);
    setForm({
      clubName: club.clubName || "",
      clubDivision: club.clubDivision || "",
      province: club.province || "",
      adminName: club.adminName || "",
      email: club.email || "",
      phoneNumber: club.phoneNumber || "",
    });
    setShowEdit(true);
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Clubs Management</h2>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search clubs..."
            className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 w-1/3"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Add New Club</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Club Name</th>
                <th>Division</th>
                <th>Province</th>
                <th>Admin</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClubs.map((club) => (
                <tr key={club._id} className="border-t border-gray-700">
                  <td className="py-2">{club.clubName}</td>
                  <td>{club.clubDivision}</td>
                  <td>{club.province}</td>
                  <td>{club.adminName}</td>
                  <td>{club.email}</td>
                  <td>{club.phoneNumber}</td>
                  <td>
                    <button className="text-blue-400 hover:underline mr-2" onClick={() => openEdit(club)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Club Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Club</h3>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Club Name" value={form.clubName} onChange={e => setForm(f => ({ ...f, clubName: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Division" value={form.clubDivision} onChange={e => setForm(f => ({ ...f, clubDivision: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Province" value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Admin Name" value={form.adminName} onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Phone Number" value={form.phoneNumber} onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded bg-gray-600 text-white">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Club Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Club</h3>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Club Name" value={form.clubName} onChange={e => setForm(f => ({ ...f, clubName: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Division" value={form.clubDivision} onChange={e => setForm(f => ({ ...f, clubDivision: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Province" value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Admin Name" value={form.adminName} onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Phone Number" value={form.phoneNumber} onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 rounded bg-gray-600 text-white">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
