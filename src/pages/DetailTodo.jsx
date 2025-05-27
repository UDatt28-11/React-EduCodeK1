import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api";
import { toast } from "react-toastify";

const DetailTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await getProductById(id);
        if (res.status === 200) {
          setTodo(res.data);
        } else {
          toast.error("Không tìm thấy todo");
        }
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu todo");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTodo();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );

  if (!todo)
    return (
      <div className="alert alert-warning text-center mt-5">
        Không có dữ liệu todo để hiển thị.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Chi tiết Todo</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{todo.id}</td>
              </tr>
              <tr>
                <th>Tiêu đề</th>
                <td>{todo.title}</td>
              </tr>
              <tr>
                <th>Mô tả</th>
                <td>{todo.description || "Không có mô tả"}</td>
              </tr>
              <tr>
                <th>Trạng thái</th>
                <td>
                  <span
                    className={`badge ${
                      todo.completed ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Mức độ ưu tiên</th>
                <td className="text-capitalize">{todo.priority}</td>
              </tr>
            </tbody>
          </table>

          <Link to="/" className="btn btn-outline-primary mt-3">
             Quay về danh sách
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
