import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function fetchTransfers() {
  return fetch("/api/transfers").then((res) => res.json());
}

function updateTransfer(id, data) {
  return fetch(`/api/transfers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default function TransfersBans() {
  const queryClient = useQueryClient();
  const { data: transfers = [], isLoading } = useQuery({ queryKey: ["transfers"], queryFn: fetchTransfers });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateTransfer(id, data),
    onSuccess: () => queryClient.invalidateQueries(["transfers"]),
  });

  function handleApprove(id) {
    updateMutation.mutate({ id, status: "Approved" });
  }
  function handleDeny(id) {
    updateMutation.mutate({ id, status: "Rejected" });
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Transfers & Bans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Transfer Requests */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Pending Transfer Requests</h3>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400">
                  <th className="py-2">Player</th>
                  <th>Old Club</th>
                  <th>New Club</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transfers.filter(t => t.status === "Pending").map((t) => (
                  <tr key={t._id} className="border-t border-gray-700">
                    <td className="py-2">{t.player?.name || "-"}</td>
                    <td>{t.fromClub}</td>
                    <td>{t.toClub}</td>
                    <td>{t.status}</td>
                    <td>
                      <button className="text-green-400 hover:underline mr-2" onClick={() => handleApprove(t._id)}>Approve</button>
                      <button className="text-red-400 hover:underline" onClick={() => handleDeny(t._id)}>Deny</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Disciplinary Actions (static for now) */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Disciplinary Actions</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Player</th>
                <th>Offense</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="py-2">Mike Zulu</td>
                <td>Violent Conduct</td>
                <td>2 matches</td>
                <td>
                  <button className="text-blue-400 hover:underline mr-2">Process Disciplinary</button>
                  <button className="text-green-400 hover:underline">Approve</button>
                </td>
              </tr>
              {/* ...more rows */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
