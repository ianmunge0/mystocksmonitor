import { PROFIT, TOTAL_SALES, TOTAL_PURCHASES, TOTAL_EXPENSES, TOTAL_BAD_STOCK } from "./actions";
import axios from 'axios';
import Api from '../../api/api'

export const getCashAtHand = (cashathandcreds) => {
    return (dispatch) => {
        
        var unixstarttime = cashathandcreds.startDate.getTime()/1000;
        var unixendtime = Math.trunc(cashathandcreds.endDate.getTime()/1000);
        
        Api.get(`/profitandexpense.php`,{
            params: {
                adminemailorphonekey: "0700111222",
                currentshopkey: "ashop",
                pecategkey: "timerangedefined",
                startdate: unixstarttime,
                enddate: unixendtime,
                shopidcashathandkey: "1"
            }
        })
        .then((res) => {
            console.log("p.e",res.data);
            console.log("testt",parseInt(JSON.parse(res.data[1])[0]['amount']));

            var sales = parseInt(JSON.parse(res.data[0])[0]['qtysold']) * parseInt(JSON.parse(res.data[0])[0]['onsalesellprice']);
            var purchases = parseInt(JSON.parse(res.data[0])[0]['qtysold']) * parseInt(JSON.parse(res.data[0])[0]['buyingprice']);
            var expenses = parseInt(JSON.parse(res.data[1])[0]['amount']);
            var badstock = parseInt(JSON.parse(res.data[2])[0]['badstockqty']) * parseInt(JSON.parse(res.data[2])[0]['buyingprice']);

            var profit = sales - purchases - expenses - badstock;
            console.log("cashathand", profit);
            dispatch({
                type: PROFIT,
                profit: profit,
            });
            dispatch({
                type: TOTAL_SALES,
                sales: sales,
                //here
            });
            dispatch({
                type: TOTAL_PURCHASES,
                purchases: purchases,
                //here
            });
            dispatch({
                type: TOTAL_EXPENSES,
                expenses: expenses,
                //here
            });
            dispatch({
                type: TOTAL_BAD_STOCK,
                badstock: badstock,
                //here
            });
            
        }).catch((err) => {
            console.log("theerror",err);
        });
    }
}

export const sendSalesDetails = () => {
    return (dispatch) => {

    }
}