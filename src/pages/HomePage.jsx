import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, updateProduct } from "../api";
import { toast } from "react-toastify";

const HomePage = () => {
  const [allTasks, setAllTasks] = useState([]); // dữ liệu gốc
  const [tasks, setTasks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // completed | pending | ""
  const [sortType, setSortType] = useState("");

  // Hàm để lấy danh sách task từ API
  const fetchTasks = async () => {
    try {
      const res = await getProducts();
      if (res.status === 200) {
        setAllTasks(res.data);
        setTasks(res.data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm để xóa task
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa task này không?"
      );
      if (!confirmed) return; // nếu nhấn Cancel thì không làm gì
      const res = await deleteProduct(id);
      if (res.status === 200) {
        fetchTasks();
        toast.success("Task deleted successfully");
      } else {
        console.error("Failed to delete task");
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm để toggle trạng thái hoàn thành của task
  const toggleCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      console.log("Updating task:", updatedTodo);

      const res = await updateProduct(todo.id, updatedTodo);
      console.log("Update response:", res);

      if (res.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
        toast.success("Task updated successfully");
      } else {
        console.error("Failed to update task");
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.log("Error updating task:", error);
      toast.error("Error updating task");
    }
  };
  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };
  const handleFilterStatus = (status) => {
    setFilterStatus(status);

    let filtered = [...allTasks];
    if (status === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (status === "pending") {
      filtered = filtered.filter((task) => !task.completed);
    }

    setTasks(filtered);
    // Gọi lại sắp xếp sau khi lọc
    if (sortType) handleSort(sortType);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortType(value);

    let sortedTasks = [...allTasks];

    switch (value) {
      case "title-asc":
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-old":
        sortedTasks.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "date-new":
        sortedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "priority-low-high":
        sortedTasks.sort((a, b) => a.priority - b.priority);
        break;
      case "priority-high-low":
        sortedTasks.sort((a, b) => b.priority - a.priority);
        break;
      default:
        sortedTasks = [...allTasks];
    }

    setTasks(sortedTasks);
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((task) =>
      priorityFilter ? task.priority === priorityFilter : true
    );

  return (
    <div className="container py-4">
  <h1 className="mb-4 text-primary">Danh sách Task</h1>

  <div className="d-flex justify-content-between align-items-center mb-3">
    <Link to="/add" className="btn btn-success"> Thêm task</Link>
  </div>

  <div className="row g-2 mb-4">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder=" Tìm kiếm theo tiêu đề..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
    <div className="col-md-2">
      <select
        className="form-select"
        value={filterStatus}
        onChange={(e) => handleFilterStatus(e.target.value)}
      >
        <option value="">-- Trạng thái --</option>
        <option value="completed"> Hoàn thành</option>
        <option value="pending"> Chưa hoàn thành</option>
      </select>
    </div>
    <div className="col-md-2">
      <select
        className="form-select"
        value={priorityFilter}
        onChange={handlePriorityChange}
      >
        <option value="">-- Ưu tiên --</option>
        <option value="low"> Low</option>
        <option value="medium"> Medium</option>
        <option value="high"> High</option>
      </select>
    </div>
    <div className="col-md-4">
      <select
        className="form-select"
        value={sortType}
        onChange={handleSortChange}
      >
        <option value="">-- Sắp xếp theo --</option>
        <option value="title-asc"> A → Z</option>
        <option value="title-desc"> Z → A</option>
        <option value="date-old"> Cũ → Mới</option>
        <option value="date-new"> Mới → Cũ</option>
        <option value="priority-low-high"> Low → High</option>
        <option value="priority-high-low"> High → Low</option>
      </select>
    </div>
  </div>

  <table className="table table-bordered table-hover align-middle">
    <thead className="table-dark">
      <tr>
        <th>ID</th>
        <th>Tiêu đề</th>
        <th>Mô tả</th>
        <th>Ưu tiên</th>
        <th>Trạng thái</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td className="text-capitalize">{task.priority}</td>
            <td>
              <button
                className={`btn btn-sm ${task.completed ? "btn-success" : "btn-warning"}`}
                onClick={() => toggleCompleted(task)}
              >
                {task.completed ? "Hoàn thành" : "Chưa hoàn thành"}
              </button>
            </td>
            <td>
              <div className="d-flex gap-2">
                <Link to={`/view/${task.id}`} className="btn btn-info btn-sm"> View</Link>
                <Link to={`/edit/${task.id}`} className="btn btn-primary btn-sm"> Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task.id)}
                >
                   Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center text-muted py-3">
            Không tìm thấy task nào phù hợp.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  );
};

export default HomePage;
