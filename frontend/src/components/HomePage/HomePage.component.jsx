import "./HomePage.styles.css";

import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch("/api/users");
      let json = await response.json();
      setUsers(json.results);
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
