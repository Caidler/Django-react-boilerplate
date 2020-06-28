import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch("/api/users");
      let json = await response.json();
      setUsers(json);
    };
    fetchData();
  }, []);
  return (
    <div>
      {users.map((user) => (
        <p>
          {user.username} {user.email}
        </p>
      ))}
    </div>
  );
}
