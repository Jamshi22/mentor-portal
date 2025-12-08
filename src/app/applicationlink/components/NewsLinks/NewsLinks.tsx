import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  useUploadNewsMutation,
  useGetNewsByStateQuery,
  useEditNewsMutation,
} from "../../../../lib/services/newsAndUpdates"; // adjust path if needed

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const NewsLinks = () => {
  const [formData, setFormData] = useState({
    link: "",
    title: "",
    degree_type: "UG",
    state: "Karnataka",
    year: ""
  });

  const [editId, setEditId] = useState(null);

  const [uploadNews] = useUploadNewsMutation();
  const [editNews] = useEditNewsMutation();
  const { data: apiResponse, refetch } = useGetNewsByStateQuery(
    { state: formData.state, degree_type: formData.degree_type },
    //@ts-ignore
    { skip: !formData.state, refetchOnMountOrArgChange: true, keepUnusedDataFor: 0 }
  );

  const newsList = apiResponse?.data?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (news) => {
    setFormData({
      link: news.link || "",
      title: news.title || "",
      degree_type: news.degree_type || "UG",
      state: news.state || "Karnataka",
      year: news.year || ""
    });
    setEditId(news._id || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await editNews({ id: editId, updatedData: formData }).unwrap();
        Swal.fire("Updated!", "News updated successfully", "success");
      } else {
        await uploadNews(formData).unwrap();
        Swal.fire("Added!", "News added successfully", "success");
      }
      await refetch();
      setFormData({
        link: "",
        title: "",
        degree_type: "UG",
        state: formData.state,
        year: ""
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving news:", error);
      Swal.fire("Error", "Failed to save news", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e42e27",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // TODO: Replace with your delete mutation
          // await deleteNews(id).unwrap();
          Swal.fire("Deleted!", "News has been deleted.", "success");
          await refetch();
        } catch (error) {
          Swal.fire("Error", "Failed to delete news", "error");
        }
      }
    });
  };

  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 items-center"
      >
        <input
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link"
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <select
          name="degree_type"
          value={formData.degree_type}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[120px]"
        >
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[150px]"
        >
          {indianStates.map((st, idx) => (
            <option key={idx} value={st}>
              {st}
            </option>
          ))}
        </select>

        {/* ✅ Year input fixed (no scroll wheel, min=1947) */}
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          min="1947"
       className="border p-2 rounded flex-1 min-w-[100px] no-spinner"
        
          onWheel={(e) =>
            //@ts-ignore
            e.target.blur()} // prevents accidental scroll changes
        />

        <button
          type="submit"
          className="text-white px-4 py-2 rounded font-semibold transition-colors"
          style={{ backgroundColor: "#089ced" }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <div className="overflow-x-auto">
        <div className="max-h-[48rem] overflow-y-auto">
          <table className="min-w-full rounded-xl border">
            <thead className="sticky top-[-1px] z-10" style={{ backgroundColor: "#089ced", color: "white" }}>
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Link</th>
                <th className="p-2 border">Degree Type</th>
                <th className="p-2 border">State</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {newsList.length > 0 ? (
                newsList.map((news) => (
                  <tr key={news._id} className="text-center">
                    <td className="p-2 border">{news.title}</td>
                    <td className="p-2 border">
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {news.link}
                      </a>
                    </td>
                    <td className="p-2 border">{news.degree_type}</td>
                    <td className="p-2 border">{news.state}</td>
                    <td className="p-2 border">{news.year || "-"}</td>
                    <td className="p-2 border flex gap-2 justify-center">
                      <button
                        type="button"
                        className="text-white px-4 py-2 rounded font-semibold"
                        style={{ backgroundColor: "#037aad" }}
                        onClick={() => handleEdit(news)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-2 border text-gray-500">
                    No news found for selected state
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default NewsLinks;
