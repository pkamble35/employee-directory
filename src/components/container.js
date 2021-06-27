import React from "react";
import "./style.css";
import API from "../utils/Api";
import { Table } from 'react-bootstrap';
class UserContainer extends React.Component {
    //set initial state
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: "",
            sortDirection: "",
            col: ""
        };
    }
    componentDidMount() {
        console.log('in use effect');
        API.usersList().then(res => {
            console.log(res);
            let users = res.data.results.map(user =>{
                return {
                    name :user.name.first + ' ' + user.name.last,
                    picture: user.picture.thumbnail,
                    email: user.email,
                    age: user.dob.age
                }
            });
            this.setState({users:users});
        });
    }
    renderList() {
        return this.state.users.map((user,index)=>{
            return (
                <tr key={index}>
                    <td><img src={user.picture}></img></td>
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
                <div className="input-group justify-content-center">
                    <div className="input-group-prepend"></div>
                    <input
                        onChange={this.handleSearchChange}
                        type="search"
                        className="form-control m-3"
                        placeholder="Search"
                        aria-label="SearchBox"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
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