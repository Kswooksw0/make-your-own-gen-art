import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  return (
    <div class="absolute left-6 top-6 w-fit text-sm text-white">
      Welcome back, {user?.user_metadata?.userName || ""}
    </div>
  );
};

export default Greeting;
