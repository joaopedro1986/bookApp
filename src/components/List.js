import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Detail from "./Detail";
import Box from "@material-ui/core/Box";
import Added from "../components/Added";
import { SignalCellularNull } from "@material-ui/icons";

const columns = [
  { id: "id", label: "id", minWidth: 50 },
  { id: "title", label: "Book Title", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FBEEC1",
  },
  container: {
    maxHeight: 440,
    backgroundColor: "#FBEEC1",
  },
  headerList: {
    backgroundColor: "#DAAD86",
  },
});

function List({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState([]);
  const [fav, setFav] = useState([]);
  const [added, setAdded] = useState(false);

  const fetchBookById = async (id) => {
    axios
      .get(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBookByAuthor = async (id) => {
    axios
      .get(
        `https://fakerestapi.azurewebsites.net/api/v1/Authors/authors/books/${id}`
      )
      .then((res) => {
        console.log(res);
        setAuthor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Method to store the value on input variable.
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const searchEngine = () => {
    if (input.length > 0) {
      data = data.filter((i) => {
        return (
          i.title.toLowerCase().match(input) ||
          i.title.toUpperCase().match(input)
        );
      });
    }
  };

  function showDetailBook(id) {
    setShowDetail(true);
    fetchBookByAuthor(id);
    fetchBookById(id);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdded = () => setAdded(!added);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="#FBEEC1">
          <TextField
            className={classes.margin}
            placeholder="Name"
            id="input-with-icon-textfield"
            label="Pesquisa"
            onChange={handleChange}
            value={input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {added ? <Added /> : null}

          <Link to={{ pathname: "/Favorite", state: [...fav] }}>
            <Button variant="contained" color="primary">
              Favorite List
            </Button>
          </Link>

          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table
                onChange={searchEngine()}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        className={classes.headerList}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={data.id}
                          onClick={() => {
                            handleAdded();
                            showDetailBook(data.id);
                          }}
                        >
                          {columns.map((column) => {
                            const value = data[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}

                                {column.id === "id" ? (
                                  <BookmarkIcon
                                    onClick={() => {
                                      const existFev = fav.some(
                                        (fav) => fav.id === data.id
                                      );
                                      console.log(existFev);
                                      if (existFev) {
                                        const favFilter = fav.filter(
                                          (fav) => fav.id !== data.id
                                        );
                                        return setFav(favFilter);
                                      }
                                      return setFav((oldArray) => [
                                        ...oldArray,
                                        data,
                                      ]);
                                    }}
                                  />
                                ) : null}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        <Box p={2} bgcolor="#FBEEC1">
          {showDetail ? <Detail book={book} author={author} /> : null}
        </Box>
      </Box>
    </>
  );
}

export default List;
