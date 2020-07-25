import React, { Component } from "react";

export default class Expenses extends Component {
    render() {
        return (
            <div className="container">
                <h5 align="center">Expenses {/*For this period */}</h5>
                <table className="highlight">
                    <tbody>
                        <tr className="modal-trigger " data-target="editmodal">
                            <td>
                                <h6>Transport to client</h6>
                            </td>
                            <td className="right">
                            <div>
                                <h6>50/=</h6>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5 align="center">Total /=</h5>
            </div>
        )
    }
}
