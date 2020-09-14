import React, { useEffect, useState } from "react";
import { getShop, updateShop, deleteShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { Divider } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShopSettings(props) {
  useEffect(() => {
    getShop(props.match.params.id);
  }, []);

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({ shopname: "" });

  const getShop = (id) => {
    console.log({
      id,
      action: "single",
    });
    setLoading(true);
    Api.get(`/shops.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        const shop = res.data;
        setLoading(false);
        setShop(shop);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };

  const [error, setError] = useState("");

  const updateShop = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(shop);
    shop.action = "update";
    Api.get(`/shops.php`, {
      params: shop,
    })
      .then((res) => {
        const profile = res.data;
        setLoading(false);
        console.log("updateShop actions ", profile);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });

    // setError("");
    console.log(shop);

    // if (shop["password"] === "" && shop["shopname"] === "") {
    //   setError("you have not changed anything");
    // } else {
    //   shop.id = props.shop.shop.serialno;
    //   props.updateShop(shop);
    // }
  };

  const deleteShop = (id) => {
    var para = {
      id,
      admin: reactLocalStorage.getObject("userdata").serialno,
      action: "delete",
    };
    console.log("para", para);
    Api.get(`/shops.php`, {
      params: para,
    })
      .then((res) => {
        const shop = res.data;
        console.log("shops deleted", shop);

        //redirect to initialshopspage if all shops has been deleted
        //or to remain in shops page if there are still more shops in this account
        if (shop.length == 0) {
          reactLocalStorage.setObject("shops", "");
          var initialdata = reactLocalStorage.getObject("userdata");
          initialdata.default_shop = "";
          initialdata.currentshop = "";
          reactLocalStorage.setObject("userdata", initialdata);
          props.history.push("/initialshopspage");
        } else {
          //remove this shop from admin default in the localstorage if its has been deleted
          if (
            id === reactLocalStorage.getObject("userdata").default_shop ||
            reactLocalStorage.getObject("userdata").default_shop === ""
          ) {
            var initialdata = reactLocalStorage.getObject("userdata");
            initialdata.default_shop = shop[0]["serialno"];
            initialdata.currentshop = shop[0];
            reactLocalStorage.setObject("userdata", initialdata);
            reactLocalStorage.setObject("currentshop", shop[0]);
          }
          reactLocalStorage.setObject("shops", shop);
          props.history.push("/shops");
        }
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleShopData = (e) => {
    setShop({
      ...shop,
      [e.target.id]: e.target.value,
    });
    console.log(shop);
  };
  console.log("settings", shop);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    setOpen(false);
    if (action === "delete") {
      deleteShop(props.match.params.id);
    }
  };

  return (
    <>
      <Loader fullPage loading={loading} />
      {shop.shopname != "" && (
        <form className="col s12" onSubmit={updateShop} style={{ margin: 10 }}>
          <p className="red-text">{error}</p>
          <p style={{ padding: 0, margin: 0 }}>Shop name</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            defaultValue={shop.shopname}
            onChange={handleShopData}
            name="shopname"
            type="text"
            id="shopname"
          />
          <p style={{ padding: 0, margin: 0 }}>Branch</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            defaultValue={shop.region}
            onChange={handleShopData}
            name="region"
            type="text"
            id="region"
          />
          <p style={{ padding: 0, margin: 0 }}>Type</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            defaultValue={shop.shoptype}
            onChange={handleShopData}
            name="shoptype"
            type="text"
            id="shoptype"
          />
          <h5>Settings</h5>
          <Divider />
          <h6 style={{ margin: 0, padding: 0 }}>
            Send Backup{" "}
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </h6>

          {/* <div className="input-field custominpt col s12"> */}
          <div>Backup email</div>
          {/* <input
          id="shoptype"
          type="text"
          placeholder="shoptype"
          onChange={handleShopData}
          defaultValue={shop.emailaddress}
          className="validate"
        /> */}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={shop.emailaddress}
            onChange={handleShopData}
            name="email"
            type="text"
            id="email"
          />
          {/* </div> */}
          <Button
            style={{
              padding: 15,
              color: "red",
              textDecoration: "none",
              textAlign: "center",
              fontSize: 17,
            }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            Delete Shop
          </Button>

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
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete your shop?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleClose("close")} color="primary">
            Not Yet
          </Button>
          <Button onClick={() => handleClose("delete")} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ShopSettings;

// const mapStateToProps = (state) => ({
//   shop: state.shops,
// });

// const mapDispacthToProps = (dispatch) => {
//   return {
//     getShop: (id) => dispatch(getShop(id)),
//     updateShop: (data) => dispatch(updateShop(data)),
//     deleteShop: (shopid) => dispatch(deleteShop(shopid)),
//   };
// };
// export default connect(mapStateToProps, mapDispacthToProps)(ShopSettings);
