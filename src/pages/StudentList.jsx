import React, {useState} from 'react';

const StudentList = ({ students }) => {
    const hocLuc = (dtb) => {
        if (dtb >= 8){
            return "Giỏi"
        } else if(dtb >= 6.5){
            return "Khá"
        }else if (dtb >= 5){
            return "Trung Bình"
        } else {
            return "Yếu"
        }
    }
    const [search, setSearch] = useState('')
    const [dtb, setDtb] = useState('')
    const [filterHl, setFilterHl] = useState('')
  return (
      <>
          <h1 className="mt-5 mb-10">Bảng sinh viên</h1>
          <div className="row">
                  <div className="col-md-4">
                      <input onChange={(e) => setSearch(e.target.value)} type="search" id="form1"
                             className="form-control" placeholder='Vui lòng nhập tên'/>
                      <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="col-md-4">
                  <select onChange={(e) => setDtb(e.target.value)} className="form-select mb-3 mt-3"
                          aria-label="Default select example">
                      <option>Điểm trung bình</option>
                      <option value="desc">Cao → Thấp</option>
                      <option value="asc">Thấp → Cao</option>
                  </select>
              </div>

              <div className="col-md-4">
                  <select onChange={(e) => setFilterHl(e.target.value)} className="form-select" id="filterSelect">
                      <option value="">-- Lọc theo học lực --</option>
                      <option value="Giỏi">Giỏi</option>
                      <option value="Khá">Khá</option>
                      <option value="Trung Bình">Trung bình</option>
                      <option value="Yếu">Yếu</option>
                  </select>
              </div>
          </div>


          <table className="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Điểm Toán</th>
                  <th scope="col">Điểm Văn</th>
                  <th scope="col">Điểm Tiếng Anh</th>
                  <th scope="col">Điểm Trung Bình</th>
                  <th scope="col">Học lực</th>
              </tr>
              </thead>
              <tbody>
              {students.map((item) => {
                  const avg = (item.math + item.literature + item.english) / 3
               return {
                   ...item,
                  dtb: avg,
                  hocluc: hocLuc(avg)
              }
              }).sort((a, b) => {
                  if (dtb === "desc") {
                      return b.dtb - a.dtb
                  }
                  if (dtb === "asc") {
                      return a.dtb - b.dtb
                  }
                  return 0
              }).filter((item) => {
                  if (!filterHl) return true;
                  return item.hocluc === filterHl;
              }).filter((item) => {
                  return item.name.toLowerCase().includes(search.toLowerCase())
              }).map((item) => {
                  return (
                      <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.name}</td>
                          <td>{item.math}</td>
                          <td>{item.literature}</td>
                          <td>{item.english}</td>
                          <td>{item.dtb.toFixed(2)}</td>
                          <td>{item.hocluc}</td>
                      </tr>
                  )
              })}
              </tbody>
          </table>
      </>
  );
};

export default StudentList;