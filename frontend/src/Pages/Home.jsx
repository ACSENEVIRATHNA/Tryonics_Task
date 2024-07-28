import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MdOutlineModeEdit,
  MdOutlineDelete,
  MdSearch,
  MdAdd,
} from "react-icons/md";
import Popup from "../Components/Popup";
import Form from "../Components/Form";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUSer] = useState(null);
  const [user, setUser] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const usersPerPage = 13;

  const handleShow = (user) => {
    setEditingUSer(user);
    setShow(true);
  };

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost/php-backend/fetch_users.php"
    );
    setUser(result.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.post(
      "http://localhost/php-backend/delete_user.php",
      { id }
    );
    toast.error(result.data);
    loadUsers();
  };

  const addUser = () => {
    setEditingUSer(null);
    setShow(true);
  };

  const offset = currentPage * usersPerPage;
  const filteredUsers = user.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.mobile.includes(searchQuery) ||
      u.id.includes(searchQuery)
  );
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(user.length / usersPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleMouseEnter = (event, user) => {
    setHoveredUser(user);
    setHoverPosition({
      top: event.pageY + 40,
      left: event.pageX + 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <div className=" container-xxl postion-relative">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-sm-3 mt-5 mb-4 text-gred position-relative">
              <MdSearch className="input-icon fs-3 ms-2" />

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email or mobile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div
              className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "green" }}
            >
              <h2>
                <b>Users</b>
              </h2>
            </div>
            <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
              <button
                variant="primary"
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={() => addUser()}
              >
                <MdAdd />
                <span>Add New User</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive">
              <table className="table table-stripped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Country</th>
                    <th>Birth Day</th>
                    <th>About</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((res, index) => (
                    <tr
                      key={index}
                      onMouseEnter={(e) => handleMouseEnter(e, res)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <td>{res.id}</td>
                      <td>{res.name}</td>
                      <td>{res.email}</td>
                      <td>{res.mobile}</td>
                      <td>{res.country}</td>
                      <td>{format(new Date(res.birthday), "d MMM yyyy")}</td>
                      <td className="about-cell">{res.about}</td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => handleShow(res)}
                        >
                          <MdOutlineModeEdit className="fs-4 text-primary" />
                        </button>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => handleDelete(res.id)}
                        >
                          <MdOutlineDelete className="fs-4 text-danger " />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
        {show && (
          <Form user={editingUser} setShow={setShow} loadUsers={loadUsers} />
        )}
        {hoveredUser && <Popup data={hoveredUser} position={hoverPosition} />}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Home;
