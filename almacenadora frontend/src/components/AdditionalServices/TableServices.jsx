import { useState, useEffect } from "react";
import axios from "axios";
/* import { Link } from "react-router-dom"; */
/* import '../Cellar/Cellar.css' */
import { Service } from "./Service";

export const TableServices = () => {
    const [services, setServices] = useState([{}]);
    const [idService, setIdService] = useState();

    const getServices = async () => {
        try {
            const { data } = await axios('http://localhost:3000/service/get')
            setServices(data.services)
        } catch (err) {
            console.log(err)
        }
    }


    const addServices = async () => {
        try {
            let service = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/service/add', service)
            alert(data.message)
            getServices()
            resetAdd()
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputDescription').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => getServices, [])

    return (
        <>
            <h1 className="text-center">Additional Services <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-houses-fill" viewBox="0 0 16 16">
                <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
            </svg>
            </h1>
            <br />
            <div className="button-container text-center">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Service  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </button>
                {/* Empieza el modal */}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Service</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="formAdd">

                                    <div className="mb-3">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputName" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputDescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="inputDescription" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPrice" className="form-label">Price</label>
                                        <input type="Number" className="form-control" id="inputPrice" required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={addServices} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
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
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(({ _id, name, description, price }, index) => {



                            const updateService = async () => {
                                try {
                                    let cellarUp = {
                                        name: document.getElementById('inputName2').value,
                                        description: document.getElementById('inputDescription2').value,
                                        price: document.getElementById('inputPrice2').value
                                    }
                                    const { data } = await axios.put(`http://localhost:3000/service/update/${idService}`, cellarUp)
                                    alert('Updated Sucessfully')
                                    getServices()
                                    clear2()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            const clear2 = async () => {
                                try {
                                    document.getElementById('inputName2').value = '',
                                        document.getElementById('inputDescription2').value = '',
                                        document.getElementById('inputPrice2').value = ''
                                } catch (error) {
                                    console.log(error)
                                }
                            }


                            const viewUpdate = async (idService) => {
                                try {
                                    setIdService(idService)
                                    document.getElementById('inputName2').defaultValue = name,
                                        document.getElementById('inputDescription2').defaultValue = description,
                                        document.getElementById('inputPrice2').defaultValue = price
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            return (
                                <tr className="text-center" key={index}>
                                    <Service
                                        name={name}
                                        description={description}
                                        price={price}
                                    ></Service>
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
                                                        <h5 className="modal-title" id="exampleModalLabel">Update Service</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="inputName2" className="form-label">Name</label>
                                                            <input type="text" className="form-control" id="inputName2" required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="inputDescription2" className="form-label">Description</label>
                                                            <input type="text" className="form-control" id="inputDescription2" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="inputPrice2" className="form-label">Price</label>
                                                            <input type="text" className="form-control" id="inputPrice2" required />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick={() => updateService(_id)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br /><br />
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