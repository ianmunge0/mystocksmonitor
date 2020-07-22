import { CASH_AT_HAND } from "./actions";
import axios from 'axios';
import Api from '../../api/api'

export const getCashAtHand = (cashathandcreds) => {
    return (dispatch) => {
        Api.get(`/profitandexpense.php`,{
            params: {
                adminemailorphonekey: "0700111222",
                currentshopkey: "ashop",
                cfmanagerkey: "currentcash",
                shopidcashathandkey: 1
            }
        })
        .then((res) => {
            console.log("p.e",res.data);

            var cashin = res.data[1][0]['amount'];
            var sales = res.data[2][0]['qtysold'] * res.data[2][0]['onsalesellprice'];
            var purchases = res.data[3][0]['quantitysupplied'] * res.data[3][0]['onsupplybp'];
            var expenses = res.data[4][0]['amount'];

            var cashathand = parseInt(cashin) + sales - purchases - expenses;
            console.log("cashathand", cashathand);
            dispatch({
                type: CASH_AT_HAND,
                cashathand: cashathand
        })
        });
    }
}