import React, { Component } from "react";

export default class Purchases extends Component {
    render() {
        return (
            <div className="container">
                <h5 align="center">Purchases {/*For this period */}</h5>
                <table className="highlight">
                    <tbody>
                        <tr className="modal-trigger " data-target="editmodal">
                            <td>
                                Name: TV <br />3 @ 14000 = 42000/=
                            </td>
                            <td className="right">
                            <div>
                                Purchased from: Sony
                                <br />12 hours ago
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
