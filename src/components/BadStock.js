import React, { Component } from "react";

export default class BadStock extends Component {
    render() {
        return (
            <div className="container">
                <h5 align="center">Bad Stock {/*For this period */}</h5>
                <table className="highlight">
                    <tbody>
                        <tr className="modal-trigger " data-target="editmodal">
                            <td>
                                Name: USB cable <br />3 @ 200 = 600/=
                            </td>
                            <td className="right">
                            <div>
                                Purchased from: oraimo
                                <br />1 day ago
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
