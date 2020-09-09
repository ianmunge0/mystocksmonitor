import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { getSalesReceipts } from "../../Redux/Actions/SalesReceipts";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ITEM_HEIGHT = 48;
function ProductsAnalysis(props) {
  useEffect(() => {
    var month = options[d.getMonth()];
    getSales(month);
  }, []);
  // render() {
  const d = new Date();
  const [month, setMonth] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosee = (option) => {
    console.log("option", option);
    setMonth(option);
    getSales(option);
  };

  const getSales = (option) => {
    option = option
      ? isString(option)
        ? option
        : options[d.getMonth()]
      : options[d.getMonth()];

    setAnchorEl(null);
    // expense.action = "cashflow";
    const input = getMonth(option) + "-" + d.getFullYear();
    const output = moment(input, "MM-YY");

    var fromtimeStamp = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    var totimestamp = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    var type = "salesgraph";
    props.getSalesReceipts(fromtimeStamp, totimestamp, type);
  };
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  if (props.saleslist.length === 0) {
    return <h4>Waiting...</h4>;
  }
  return (
    <div className="container" style={{ height: "85%" }}>
      <Loader fullPage loading={props.saleslist.loading} />
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ArrowBackIosIcon />
        {console.log("mm", month)}
        {month ? month : options[d.getMonth()]} {""}
        {d.getFullYear()}
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openn}
        onClose={handleClosee}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === options[d.getMonth()]}
            onClick={() => handleClosee(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <ResponsiveContainer>
        <BarChart
          width={600}
          height={300}
          data={props.saleslist.receipts}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  saleslist: state.receipts,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getSalesReceipts: (timeStamp, totimestamp, type) =>
      dispatch(getSalesReceipts(timeStamp, totimestamp, type)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ProductsAnalysis);
