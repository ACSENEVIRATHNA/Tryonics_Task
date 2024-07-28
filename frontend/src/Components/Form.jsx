import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "jquery-validation";
import { MdOutlineModeEdit, MdAdd } from "react-icons/md";
import { FaUser, FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaInfoCircle ,FaGlobe} from "react-icons/fa";
import { countries } from "../utils/data";
import { toast } from "react-toastify";

const Form = (props) => {
  const { user, setShow, loadUsers } = props;
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    country: user?.country,
    birthday: user?.birthday,
    about: user?.about,
  });

  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    $("#userForm").validate({
      rules: {
        name: "required",
        email: {
          required: true,
          email: true,
        },
        mobile: {
          required: true,
          digits: true,
        },
        country: "required",
        birthday: "required",
        about: "required",
      },
      messages: {
        name: "Please enter your name",
        email: "Please enter a valid email address",
        mobile: "Please enter a valid mobile number",
        country: "Please enter your country",
        birthday: "Please enter your birthday",
        about: "Please enter a brief description about yourself",
      },
      submitHandler: function () {
        handleSubmit();
      },
    });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async () => {
    const latestFormData = formDataRef.current;
    try {
      let response;
      if (latestFormData.id) {
        response = await axios.post(
          "http://localhost/php-backend/update_user.php",
          latestFormData
        ).then(toast.success("User Details Updated Successfully!"));
      } else {
        response = await axios.post(
          "http://localhost/php-backend/insert_user.php",
          latestFormData
        ).then(toast.success("User Added Successfully!"));
      }

      if (response.data.includes("successfully")) {
        loadUsers();
        setShow(false);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      toast.error("Error submitting form:", error);
      setError(error.message);
    }
  };
  

  return (
    <div className="form position-absolute border p-2 rounded modal-overlay">
      <div className="row position-relative modal-form p-2">
        <button
          className="btn btn-close"
          onClick={() => setShow(false)}
        ></button>
        <h3>{formData?.id ? "UPDATE USER" : "ADD USER"}</h3>
        <form
          id="userForm"
          className="form-inline d-flex flex-column gap-2 mb-3 mt-2"
        >
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FaPhoneAlt className="input-icon" />
            <input
              type="tel"
              className="form-control"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FaGlobe className="input-icon" />
            <select
              className="form-control"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              className="form-control"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FaInfoCircle className="input-icon about" />
            <textarea
              className="form-control"
              name="about"
              placeholder="About"
              value={formData.about}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className={`btn ${
                formData?.id ? "btn-outline-primary" : "btn-outline-success"
              }`}
              type="submit"
            >
              {formData?.id ? (
                <div className="d-flex gap-2 align-items-center">
                  <MdOutlineModeEdit />
                  <span>Update User</span>
                </div>
              ) : (
                <div className="d-flex gap-2 align-items-center">
                  <MdAdd />
                  <span>Add User</span>
                </div>
              )}
            </button>
          </div>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Form;
