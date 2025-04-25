import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [editedData, setEditedData] = useState({});

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  async function fetchCandidateData() {
    try {
      const response = await axios.get(`${backend_url}/api/admin/get-all-candidates`);
      setCandidates(response.data.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  const { refetch, isFetching } = useQuery({
    queryKey: ["candidate-data"],
    queryFn: fetchCandidateData,
    refetchOnWindowFocus: false,
  });

  const handleEdit = (candidateId, field, value) => {
    setEditedData({
      ...editedData,
      [candidateId]: { ...editedData[candidateId], [field]: value },
    });
  };

  const saveChanges = (candidateId) => {
    axios
      .put(`${backend_url}/api/candidates/${candidateId}`, editedData[candidateId])
      .then((response) => {
        setCandidates(
          candidates.map((candidate) =>
            candidate._id === candidateId ? response.data : candidate
          )
        );
        setEditingCandidate(null);
        setEditedData({});
      })
      .catch((error) => console.error("Error updating candidate:", error));
  };

  return (
    <div className="p-4 relative overflow-x-auto w-[70%]">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Candidate Management</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={refetch}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[800px] border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Resume Link</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="text-center border">
                {/* Name - Editable */}
                <td className="p-2 border" onDoubleClick={() => setEditingCandidate(candidate._id)}>
                  {editingCandidate === candidate._id ? (
                    <input
                      type="text"
                      className="text-center border rounded px-1"
                      value={editedData[candidate._id]?.name || candidate.name}
                      onChange={(e) => handleEdit(candidate._id, "name", e.target.value)}
                    />
                  ) : (
                    candidate.name
                  )}
                </td>

                {/* Email - Editable */}
                <td className="p-2 border" onDoubleClick={() => setEditingCandidate(candidate._id)}>
                  {editingCandidate === candidate._id ? (
                    <input
                      type="email"
                      className="text-center border rounded px-1"
                      value={editedData[candidate._id]?.email || candidate.email}
                      onChange={(e) => handleEdit(candidate._id, "email", e.target.value)}
                    />
                  ) : (
                    candidate.email
                  )}
                </td>

                {/* Phone - Editable */}
                <td className="p-2 border" onDoubleClick={() => setEditingCandidate(candidate._id)}>
                  {editingCandidate === candidate._id ? (
                    <input
                      type="text"
                      className="text-center border rounded px-1"
                      value={editedData[candidate._id]?.phoneNo || candidate.phoneNo}
                      onChange={(e) => handleEdit(candidate._id, "phoneNo", e.target.value)}
                    />
                  ) : (
                    candidate.phoneNo
                  )}
                </td>

                {/* Resume Link - Not Editable */}
                <td className="p-2 border">
                  <a
                    href={candidate.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Resume
                  </a>
                </td>

                {/* Actions */}
                <td className="p-2 border">
                  {editingCandidate === candidate._id ? (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => saveChanges(candidate._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => setEditingCandidate(candidate._id)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateManagement;
