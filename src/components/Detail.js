import React from "react";
import Box from "@material-ui/core/Box";

function Detail({ book, author }) {
  console.log(author.firstName);
  return (
    <div>
      <div style={{ width: 800 }}>
        <Box component="div" my={2} whiteSpace="normal" bgcolor="#FBEEC1">
          <h1>Description of {book.title}</h1>
          {book.description}
        </Box>
      </div>
      <h3 style={{ marginTop: "10vh" }}>{book.title} was written by:</h3>
      {author.length > 0
        ? author.map((author) => {
            return (
              <div style={{ width: 800 }}>
                <Box
                  component="div"
                  my={2}
                  whiteSpace="normal"
                  bgcolor="#FBEEC1"
                >
                  {author.firstName} {author.lastName}
                </Box>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Detail;
