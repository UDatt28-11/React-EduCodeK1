import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../validation/toSchema";
import { getProductById, updateProduct } from "../api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Editform = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await getProductById(id);
        if (res.status === 200) {
          setTodo(res.data);
          reset(res.data);
        } else {
          toast.error("Không tìm thấy todo");
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi khi lấy dữ liệu todo");
      }
    };
    if (id) fetchTodo();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateProduct(id, data);
      if (res.status === 200) {
        toast.success("Cập nhật todo thành công");
        reset(data);
        navigate("/");
      } else {
        toast.error("Cập nhật todo thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi cập nhật todo");
    }
  };

  if (!todo)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm">
        <h3 className="mb-4">Chỉnh sửa Todo</h3>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tiêu đề <span className="text-danger">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title")}
            placeholder="Nhập tiêu đề todo"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            id="description"
            rows={3}
            className={`form-control ${
              errors.description ? "is-invalid" : ""
            }`}
            {...register("description")}
            placeholder="Nhập mô tả"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Mức độ ưu tiên
          </label>
          <select
            id="priority"
            className={`form-select ${errors.priority ? "is-invalid" : ""}`}
            {...register("priority")}
          >
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
          {errors.priority && (
            <div className="invalid-feedback">{errors.priority.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-success w-100"
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật todo"}
        </button>
      </form>
    </div>
  );
};

export default Editform;
