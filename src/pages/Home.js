import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import Box from "@material-ui/core/Box";

function Home() {
  const [books, setBooks] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleDetails = () => {
    setShowDetails(true);
  };

  const fetchBooks = async () => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Books")
      .then((res) => {
        setBooks(res.data.map((book) => book));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <List data={books} details={handleDetails} />
    </div>
  );
}

export default Home;
