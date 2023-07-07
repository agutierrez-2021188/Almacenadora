import { useState, useEffect } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Account } from "./Account";
export const Table = () => {
    const [iAccount, setIDAccount] = useState();
    const [accounts, setAccounts] = useState([{}]);


    const getAccounts = async () => {
        try {
            const { data } = await axios('http://localhost:3000/account/get-accounts')
            setAccounts(data.accounts)
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || "Error getting accounts");
        }
    };

    const addAccount = async () => {
        try {
            let account = {
                dpi: document.getElementById('inputDPI').value,
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                age: document.getElementById('inputAge').value,
                phone: document.getElementById('inputPhone').value,
                email: document.getElementById('inputEmail').value
            }
            const { data } = await axios.post('http://localhost:3000/account/add-account', account)
            alert(data.message)
            getAccounts();
            clear();
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputDPI').value = '',
                document.getElementById('inputName').value = '',
                document.getElementById('inputSurname').value = '',
                document.getElementById('inputAge').value = '',
                document.getElementById('inputPhone').value = '',
                document.getElementById('inputEmail').value = ''
        } catch (err) {
            console.error(err);
        }
    }



    const deleteAccount = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this account?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/account/delete-account/${id}`)
                getAccounts()
                alert(`${data.message}: ${data.deleteAccount.name}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getAccounts, [])

    return (
        <>
            <h1 className="text-center">Accounts         <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38 " fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg></h1>

            <br />
            <div className="button-container text-center">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Account  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </button>
                {/* Empieza el modal */}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Account</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="inputDPI" className="form-label">DPI</label>
                                    <input type="text" className="form-control" id="inputDPI" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="inputName" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputSurname" className="form-label">Surname</label>
                                    <input type="text" className="form-control" id="inputSurname" required />
                                </div>
                                <div>
                                    <label htmlFor="inputAge" className="form-label">Age</label>
                                    <input type="text" className="form-control" id="inputAge" required />
                                </div>
                                <div>
                                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="inputPhone" required />
                                </div>
                                <div>
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="inputEmail" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={addAccount} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>DPI</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map(({ _id, dpi, name, surname, age, phone, email }, index) => {



                            const updateAccount = async () => {
                                try {
                                    
                                    let updateAccount = {
                                        dpi: document.getElementById('inputDPI2').value,
                                        name: document.getElementById('inputName2').value,
                                        surname: document.getElementById('inputSurname2').value,
                                        age: document.getElementById('inputAge2').value,
                                        phone: document.getElementById('inputPhone2').value,
                                        email: document.getElementById('inputEmail2').value
                                    }
                                    const { data } = await axios.put(`http://localhost:3000/account/update-account/${iAccount}`, updateAccount)
                                    alert('Updated Sucessfully')
                                    getAccounts()
                                    clear2()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            const clear2 = async () => {
                                try {
                                    document.getElementById('inputDPI2').value = '',
                                        document.getElementById('inputName2').value = '',
                                        document.getElementById('inputSurname2').value = '',
                                        document.getElementById('inputAge2').value = '',
                                        document.getElementById('inputPhone2').value = '',
                                        document.getElementById('inputEmail2').value = ''
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            const viewUpdate = async (iAccount) => {
                                try {
                                    setIDAccount(iAccount)
                                    document.getElementById('inputDPI2').defaultValue = dpi,
                                        document.getElementById('inputName2').defaultValue = name,
                                        document.getElementById('inputSurname2').defaultValue = surname,
                                        document.getElementById('inputAge2').defaultValue = age,
                                        document.getElementById('inputPhone2').defaultValue = phone,
                                        document.getElementById('inputEmail2').defaultValue = email
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            // Lol
                            return (
                                <tr className="text-center" key={index}>
                                    <Account
                                        dpi={dpi}
                                        name={name}
                                        surname={surname}
                                        age={age}
                                        phone={phone}
                                        email={email}
                                    ></Account>
                                    <td>
                                        <div className="button-container text-center">

                                            <svg onClick={() => viewUpdate(_id)} data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            {/* Empieza el modal */}
                                            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Account</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="mb-3">
                                                                <label htmlFor="inputDPI2" className="form-label">DPI</label>
                                                                <input type="text" className="form-control" id="inputDPI2" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputName2" className="form-label">Name</label>
                                                                <input type="text" className="form-control" id="inputName2" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputSurname2" className="form-label">Surname</label>
                                                                <input type="text" className="form-control" id="inputSurname2" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputAge2" className="form-label">Age</label>
                                                                <input type="text" className="form-control" id="inputAge2" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputPhone2" className="form-label">Phone</label>
                                                                <input type="text" className="form-control" id="inputPhone2" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputEmail2" className="form-label">Email</label>
                                                                <input type="text" className="form-control" id="inputEmail2" required />
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button onClick={() => updateAccount(_id)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br /><br />
                                        </div>
                                    </td>
                                    <td>

                                        <svg onClick={() => deleteAccount(_id)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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