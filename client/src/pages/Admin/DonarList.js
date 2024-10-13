import React, { useEffect, useState, useCallback } from "react"
import Layout from "../../components/shared/Layout/Layout"
import moment from "moment"
import API from "../../services/API"

const DonarList = () => {
  const [data, setData] = useState([])

  // Find donar records
  const getDonars = useCallback(async () => {
    try {
      const { data } = await API.get("/admin/donar-list")
      if (data?.success) {
        setData(data?.donarData)
      }
    } catch (error) {
      console.error("Error fetching donar data:", error)
    }
  }, [])

  useEffect(() => {
    getDonars()
  }, [getDonars])

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this donor?"
      )
      if (!answer) return

      const { data } = await API.delete(`/admin/delete-donar/${id}`)
      alert(data?.message)
      getDonars() // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting donor:", error)
    }
  }

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record._id}>
              <td>{record.name || `${record.organisationName} (ORG)`}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default DonarList
