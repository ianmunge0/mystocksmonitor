import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { getStockCountHistory } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { Divider } from "@material-ui/core";

function CountHistory(props) {
  useEffect(() => {
    props.getStockCountHistory(
      reactLocalStorage.getObject("userdata").default_shop
    );
  }, []);

  var tifOptions = null;
  if (props.stocks.items) {
    tifOptions = Object.keys(props.stocks.items).map((key) => (
      <div key={key}>
        {console.log(new Date(key).getTime())}
        <div style={{ marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
          <h3 className="title left ">{key.split("_")[0]}</h3>
          <Chip
            icon={<FaceIcon />}
            label={`${props.stocks.items[key].length}/${props.stocks.count} items counted`}
            clickable
            color="primary"
            // onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            onClick={() => {
              props.history.push({
                pathname: `/counts/${key.split("_")[1]}`,
              });
            }}
          />
        </div>
        <Divider />
      </div>
    ));
  }
  return <>{tifOptions}</>;
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stockcounts,
  loading: state.stock.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStockCountHistory: (shopid) => dispatch(getStockCountHistory(shopid)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(CountHistory));
