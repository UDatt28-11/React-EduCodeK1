import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../validation/toSchema";
import { createProduct } from "../api";
import { toast } from "react-toastify";

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      completed: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createProduct(data);
      if (res.status === 201) {
        toast.success("Tạo mới todo thành công");
        reset();
      } else {
        toast.error("Tạo mới todo thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <form
        className="border p-4 rounded shadow-sm bg-light"
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-center text-primary">Tạo mới Todo</h2>

        {/* Title */}
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

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            id="description"
            rows={3}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            {...register("description")}
            placeholder="Nhập mô tả"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        {/* Priority */}
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
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang tạo..." : "Tạo mới todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
