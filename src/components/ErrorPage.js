import React from "react";
import "../css/ErrorPage.css"
import $ from "jquery"
import { useEffect } from "react";


export const ErrorPage = () => {
    // let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    // myModal.show();

    useEffect(() => {
        window.$('#myModal').modal('show');
        console.log("in error page")
    }, [])

    const hide = () => {
        window.$('#myModal').modal('hide');
    }

    return (
        <>
            {/*      <div className="text-center">

                 <a href="#myModal" className="trigger-btn" data-toggle="modal">Click to Open Confirm Modal</a>
             </div> */}

            <div id="myModal" className="modal fade">
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="icon-box">
                                <i className="material-icons">&#xE5CD;</i>
                            </div>
                            <h4 className="modal-title w-100">Sorry!</h4>
                        </div>
                        {/* <div className="modal-body">
                            <p className="text-center">Your transaction has failed. Please go back and try again.</p>
                        </div> */}
                        <div className="modal-footer">
                            <button className="btn btn-danger btn-block" onClick={hide}>OK</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )


}