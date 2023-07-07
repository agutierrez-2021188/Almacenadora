import { useState, useEffect } from "react";
import { User } from "./User";
import axios from "axios";
import '../User/Cellar.css'
import { useParams } from "react-router-dom";

export const TableUser = () => {

    const [users, setUsers] = useState([{}]);
    const [idUser, setIdUser] = useState();

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:3000/user/getUsers')
            setUsers(data.users)
        } catch (err) {
            console.log(err)
        }
    }

    const addUser = async () => {
        try {
            let users = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                password: document.getElementById('inputPassword').value,
                phone: document.getElementById('inputPhone').value
            }
            const { data } = await axios.post('http://localhost:3000/user/save', users)
            alert(data.message)
            getUsers()
            resetAdd()
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const deleteUser = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this user?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/user/delete/${id}`)
                getUsers()
                alert(`${data.message}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputSurname').value = '',
                document.getElementById('inputUsername').value = '',
                document.getElementById('inputPassword').value = '',
                document.getElementById('inputPhone').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => getUsers, [])



    return (
        <>
            <br />
            <div>
                <h1 className="text-center">Users         <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38 " fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg></h1>
                <br />
            </div>
            <div className="button-container text-center">
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    Add User
                </button>
                {/* Empieza el modal */}
                <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="formAdd">

                                    <div className="mb-3">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputName" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputSurname" className="form-label">Surname</label>
                                        <input type="text" className="form-control" id="inputSurname" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputUsername" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="inputUsername" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPassword" className="form-label">Password</label>
                                        <input type="text" className="form-control" id="inputPassword" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="inputPhone" required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={addUser} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ _id, name, surname, username, phone }, index) => {

                            const updateUser = async () => {
                                try {
                                    let userUp = {
                                        name: document.getElementById('inputNameUp').value,
                                        surname: document.getElementById('inputSurnameUp').value,
                                        username: document.getElementById('inputUsernameUp').value,
                                        phone: document.getElementById('inputPhoneUp').value
                                    }
                                    const { data } = await axios.put(`http://localhost:3000/user/update/${idUser}`, userUp)
                                    alert(data.message)
                                    getUsers()
                                    resetUp()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            const resetUp = async () => {
                                try {
                                    document.getElementById('inputNameUp').value = '',
                                        document.getElementById('inputSurnameUp').value = '',
                                        document.getElementById('inputUsernameUp').value = '',
                                        document.getElementById('inputPhoneUp').value = ''
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            const viewUpdate = async (idUser) => {
                                try {
                                    setIdUser(idUser)
                                    document.getElementById('inputNameUp').defaultValue = name,
                                        document.getElementById('inputSurnameUp').defaultValue = surname,
                                        document.getElementById('inputUsernameUp').defaultValue = username,
                                        document.getElementById('inputPhoneUp').defaultValue = phone
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            return (
                                <tr className="text-center" key={index}>
                                    <User
                                        name={name}
                                        surname={surname}
                                        username={username}
                                        phone={phone}
                                    >
                                    </User>
                                    <td>
                                        <svg onClick={() => viewUpdate(_id)} type="button" className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        {/* Empieza el modal */}
                                        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form id="formUp">
                                                            <div className="mb-3">
                                                                <label htmlFor="inputNameUp" className="form-label">Name</label>
                                                                <input type="text" className="form-control" id="inputNameUp" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputSurnameUp" className="form-label">Surname</label>
                                                                <input type="text" className="form-control" id="inputSurnameUp" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputUsernameUp" className="form-label">Username</label>
                                                                <input type="text" className="form-control" id="inputUsernameUp" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputPhoneUp" className="form-label">Phone</label>
                                                                <input type="text" className="form-control" id="inputPhoneUp" required />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick={() => updateUser(_id)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <svg onClick={() => deleteUser(_id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </>
    )
}