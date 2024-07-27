import React from "react";

const Popup = (props) => {
  const { data, position } = props;
  if (!data) return null;

  const { top, left } = position;
  return (
    <div className="popup" style={{ top: top, left: left }}>
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Email:</strong> {data.email}
      </div>
      <div>
        <strong>Mobile:</strong> {data.mobile}
      </div>
      <div>
        <strong>Country:</strong> {data.country}
      </div>
      <div>
        <strong>Birthday:</strong> {data.birthday}
      </div>
      <div>
        <strong>About:</strong> {data.about}
      </div>
    </div>
  );
};

export default Popup;
