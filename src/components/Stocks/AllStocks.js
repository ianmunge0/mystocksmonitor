import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { getStock, deleteStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigations/NavBar";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
// import { hashHistory } from "react-router";

import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

const columns = [
  { id: "name", label: "Name \nBuying Price", minWidth: 170 },
  { id: "sellingprice", label: "Qty \nSelling Price", minWidth: 100 },
];

function createData(name, code) {
  return { name, code };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function AllStocks(props) {
  const rows = props.stocks;
  useEffect(() => {
    props.getStock();
  }, []);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [item, setItem] = useState(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawerOne = (anchor, open, type) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    console.log(type);
    if (type === "Delete") {
      props.deleteStock(item.stockid);
    }
    if (type === "Edit") {
      props.history.push({
        pathname: `/editstock/${item.stockid}`,
      });
    }
  };

  const toggleDrawer = (anchor, open, item) => (event) => {
    console.log(item);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setItem(item);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, type) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      //   onClick={toggleDrawerOne(anchor, false,type)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Product History", "Edit", "Delete"].map((text, index) => (
          <ListItem
            onClick={toggleDrawerOne(anchor, false, text)}
            button
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (rows.length === 0) {
    return <h5>No stock available</h5>;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Loader fullPage loading={props.stockresponse.loading} />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={toggleDrawer("bottom", true, row)}
                  >
                    <TableCell>
                      {row.name} <br />
                      {row.buyingprice} /=
                    </TableCell>
                    <TableCell>
                      {row.stock_qty} {row.unit} <br />
                      {row.sellingprice} /=
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// function AllStocks(props) {
//   useEffect(() => {
//     props.getStock();

//     // var elems = document.querySelectorAll('.fixed-action-btn');
//     M.FloatingActionButton.init(
//       document.querySelectorAll(".fixed-action-btn"),
//       {}
//     );

//     M.Modal.init(document.querySelectorAll(".modal"), {
//       onOpenEnd: function (el) {},
//     });
//   }, []);

//   const [editid, setEditid] = useState("");

//   console.log(props.stocks);

//   const deleteProduct = (id) => {
//     props.deleteStock(id);
//   };

//   return (
//     <div>
//       <NavBar titleone="Stock Setup" />
//       <Loader fullPage loading={props.stockresponse.loading} />
//       <table className="highlight">
//         <thead>
//           <tr>
//             <th>
//               Name <br /> Buying Price
//             </th>
//             <th className="right">
//               <span className="right">Qty</span>
//               <br />
//               Selling Price
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           <Link to="/stockcount" className="btn" style={{ marginTop: 10 }}>
//             Products Count
//           </Link>
//           {props.stocks.length > 0 ? (
//             props.stocks.map((item, key) => (
//               <tr
//                 key={key}
//                 className="modal-trigger "
//                 onClick={() => setEditid(item.stockserial_key)}
//                 data-target="editmodal"
//               >
//                 <td>
//                   {item.name} <br />
//                   {item.buyingprice} /=
//                 </td>
//                 <td className="right">
//                   <div className="left">
//                     {item.stock_qty} {item.unit_name}
//                     <br />
//                     {item.sellingprice}/=
//                   </div>
//                   <a href="!#" className="secondary-content ">
//                     <i className="material-icons valign">more_vert</i>
//                   </a>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <h5>No stock added yet</h5>
//           )}
//         </tbody>
//       </table>
//       <div className="fixed-action-btn">
//         <Link to="newstock" className="btn-floating btn-large red">
//           <i className="large material-icons">add</i>
//         </Link>
//       </div>

//       <div id="editmodal" className="modal bottom-sheet">
//         <div className="modal-content sidenav bottom-modal">
//           <ul>
//             <li>
//               <a href="#!">
//                 <i className="material-icons">format_list_bulleted</i>
//                 Product History
//               </a>
//             </li>
//             <li>
//               <Link to={`/editstock/${editid}`}>
//                 <i className="material-icons">edit</i>Edit
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="#"
//                 onClick={() => deleteProduct(editid)}
//                 className="modal-trigger "
//                 data-target="deletealert"
//               >
//                 <i className="material-icons">delete</i>Delete
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStock: () => dispatch(getStock()),
    deleteStock: (id) => dispatch(deleteStock(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(AllStocks));
