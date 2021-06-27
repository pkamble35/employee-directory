import React from "react";
import "./style.css";
import API from "../utils/Api";
import { Table } from 'react-bootstrap';

class UserContainer extends React.Component {
    //set initial state
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.returnSortDirection = this.returnSortDirection.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.sort = this.sort.bind(this);
        this.state = {
            users: [],
            search: "",
            sortDirection: "",
            col: ""
        };
    }
    //this method returns font awesome arrow for sorting
    returnSortDirection(col) {
        if (this.state.col === col && this.state.sortDirection === "desc") {
            return <i className="fa fa-sort-desc" aria-hidden="true"></i>
        }
        if (this.state.col === col && this.state.sortDirection === "asc") {
            return <i className="fa fa-sort-asc" aria-hidden="true"></i>
        }
    }
    //call api at application loading
    componentDidMount() {
        console.log('in use effect');
        API.usersList().then(res => {
            console.log(res);
            let users = res.data.results.map(user => {
                return {
                    name: user.name.first + ' ' + user.name.last,
                    picture: user.picture.thumbnail,
                    email: user.email,
                    age: user.dob.age
                }
            });
            this.setState({ users: users });
        });
    }
    //set the state for search criteria
    handleSearch(e) {
        this.setState({ search: e.target.value.toUpperCase() });
    }
    //handle the sorting state ascending and descending, it also handles columns stat
    handleSort(value) {
        this.state.col === value && this.state.sortDirection === "asc" ?
            this.setState({ col: value, sortDirection: "desc" })
            : this.setState({ col: value, sortDirection: "asc" })
    }
    //sort based on column clicked
    sort(first, second) {
        if (first[this.state.col] > second[this.state.col]) {
            return this.state.sortDirection === "asc" ? 1 : -1;
        }
        if (first[this.state.col] < second[this.state.col]) {
            return this.state.sortDirection === "asc" ? -1 : 1;
        }
        return 0;
    }
    //filter the employees list
    filterUsers() {
        console.log(this.state.search);
        return this.state.users.filter((item) => item.name.toUpperCase().includes(this.state.search));
    }
    //dynamic rendering of employee info
    renderList() {
        return this.filterUsers().sort(this.sort).map((user, index) => {
            return (
                <tr key={index}>
                    <td><img src={user.picture} alt="employee"></img></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                </tr>
            );
        });

    }

    render() {
        return (
            <>
                <nav className="navbar navbar-light bg-primary">
                    <span className="navbar-brand mb-0 h1 "><h1>Employee Directory</h1></span>                
                        <input
                            onChange={this.handleSearch}
                            type="search"
                            className="form-control m-3"
                            placeholder="Search"
                            aria-label="SearchBox"
                            aria-describedby="basic-addon1"
                        />
                </nav>
                <div className="table m-3">
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Picture </th>
                                <th className="clickable" onClick={() => {
                                    this.handleSort("name");
                                }}>Name    {this.returnSortDirection("name")}</th>
                                <th className="clickable" onClick={() => {
                                    this.handleSort("email");
                                }}>Email   {this.returnSortDirection("email")}</th>
                                <th className="clickable" onClick={() => {
                                    this.handleSort("age");
                                }}>Age     {this.returnSortDirection("age")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default UserContainer;