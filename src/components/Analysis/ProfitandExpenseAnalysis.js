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
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { getPEA } from "../../Redux/Actions/ProfitnExpenses";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

// console.log(data);
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
function ProfitandExpenseAnalysis(props) {
  useEffect(() => {
    var month = options[d.getMonth()];
    getPEA(month);
  }, []);
  console.log("dfgd");
  // render() {
  const d = new Date();
  const [month, setMonth] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosee = (option) => {
    getPEA(option);
  };

  const getPEA = (option) => {
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
    props.getPEA(fromtimeStamp, totimestamp);
  };
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  console.log("items", props);
  // if (props.saleslist.length === 0) {
  //   return <h4>Waiting...</h4>;
  // }
  return (
    <div className="container" style={{ minWidth: "380px", height: "80%" }}>
      {/* <Loader fullPage loading={props.saleslist.loading} /> */}
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <a href="#" className="btn" style={{ marginTop: 10 }}>
          <i className="material-icons left">fast_rewind</i>
          {month ? month : options[d.getMonth()]} {""}
          {d.getFullYear()}
        </a>
      </IconButton>
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
      {/* <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
  // }
}

const mapStateToProps = (state) => ({
  graphresponse: state,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getPEA: (timeStamp, totimestamp) =>
      dispatch(getPEA(timeStamp, totimestamp)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(ProfitandExpenseAnalysis);
