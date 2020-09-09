import React, { useEffect, useState } from "react";
import { addShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { withRouter } from "react-router-dom";

function ShopForm(props) {
  const [error, setError] = useState();
  const [shopinput, setShopInput] = useState({
    shop_name: "",
  });

  const addShop = (e) => {
    e.preventDefault();
    console.log(shopinput);
    setError("");
    if (shopinput.shop_name === "") {
      setError("shop name is required");
    } else {
      props.addShop(shopinput, props);
      e.target.reset();
    }
  };

  const handleShopData = (e) => {
    console.log("", e.target.id);
    setShopInput({
      ...shopinput,
      [e.target.id]: e.target.value,
    });
  };

  console.log("mm", props);

  return (
    <>
      {/* <Loader fullPage loading={props.shops.loading} /> */}
      <form
        className="col s12"
        onSubmit={addShop}
        noValidate
        autoComplete="off"
        style={{ margin: 10 }}
      >
        <span style={{ color: "red" }}>{error}</span>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleShopData}
          placeholder="shop name"
          name="shop_name"
          type="text"
          id="shop_name"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleShopData}
          placeholder="shop type"
          name="shop_type"
          type="text"
          id="shop_type"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleShopData}
          placeholder="shop location"
          name="shop_location"
          type="text"
          id="shop_location"
        />
        {props.shops.addingerror}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ padding: 15, marginTop: 20 }}
        >
          Update
        </Button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addShop: (shop, props) => dispatch(addShop(shop, props)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(ShopForm));
