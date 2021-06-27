import "./style.css";
import React from "react";

function PageHeader() {
    return (
        <div className="jumbotron jumbotron-fluid text-center">
            <div className="container">
                <h1 className="display-4">Employee Directory</h1>
                <p className="lead">Quick access to Employee information.</p>
            </div>
        </div>
    );
}
export default PageHeader;