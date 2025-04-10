import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF resume");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post(
          "https://crispy-yodel-rvwq666vpw2p4jq-8001.app.github.dev/upload-resume/",
         // change this if using forwarded URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSkills(response.data.skills);
      setPreview(response.data.preview);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        SkillSage Resume Upload
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {skills.length > 0 && (
          <div className="bg-green-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-green-700">Extracted Skills</h2>
            <ul className="list-disc list-inside text-gray-800">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {preview && (
          <div className="bg-gray-50 p-4 rounded mt-4 text-sm text-gray-600">
            <h3 className="font-medium mb-1">Resume Preview (First 500 characters)</h3>
            <p>{preview}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
