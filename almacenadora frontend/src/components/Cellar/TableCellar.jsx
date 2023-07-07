import { useState, useEffect } from "react";
import { Cellar } from "./Cellar";
import axios from "axios";
import '../Cellar/Cellar.css'
import { useParams } from "react-router-dom";

export const Table = () => {

    const [cellars, setCellars] = useState([{}]);
    const [idCellar, setIdCellar] = useState();

    const getCellars = async () => {
        try {
            const { data } = await axios('http://localhost:3000/cellar/get')
            setCellars(data.cellars)
        } catch (err) {
            console.log(err)
        }
    }

    const searchCellars = async () => {
        try {
            let cellarSearch = {
                name: document.getElementById('inputNameSearch').value
            }
            const { data } = await axios.post('http://localhost:3000/cellar/search', cellarSearch)
            setCellars(data.cellars)
        } catch (err) {
            console.log(err)
        }
    }

    const searchAv = async () => {
        try {
            let cellarSearch = {
                name: document.getElementById('inputNameSearch').value
            }
            const { data } = await axios.post('http://localhost:3000/cellar/searchAv', cellarSearch)
            setCellars(data.cellars)
        } catch (err) {
            console.log(err)
        }
    }

    const searchNo = async () => {
        try {
            let cellarSearch = {
                name: document.getElementById('inputNameSearch').value
            }
            const { data } = await axios.post('http://localhost:3000/cellar/searchNo', cellarSearch)
            setCellars(data.cellars)
        } catch (err) {
            console.log(err)
        }
    }


    const addCellar = async () => {
        try {
            let cellars = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                location: document.getElementById('inputLocation').value,
                size: document.getElementById('inputSize').value,
                availability: document.getElementById('inputAvailability').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/cellar/add', cellars)
            alert(data.message)
            getCellars()
            resetAdd()
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const deleteCellar = async (id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this cellar?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/cellar/delete/${id}`)
                getCellars()
                alert(`${data.message}: ${data.deletedCellar.name}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputDescription').value = '',
                document.getElementById('inputLocation').value = '',
                document.getElementById('inputSize').value = '',
                document.getElementById('inputAvailability').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => getCellars, [])



    return (
        <>
            <br />
            <div>
                <h1 className="text-center">CELLARS <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-houses-fill" viewBox="0 0 16 16">
                    <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                    <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
                </svg>
                </h1>
                <br />
            </div>
            <div className="input-group mb-3">
                <input id="inputNameSearch" type="text" className="form-control" placeholder="Search Cellar" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchCellars}>Search</button>

            </div>
            <div className="button-container text-center">
                <button onClick={getCellars} className="btn btn-outline-success">All Cellars</button>
                <button onClick={searchCellars} className="btn btn-outline-primary">All</button>
                <button onClick={searchAv} className="btn btn-outline-info">Availability</button>
                <button onClick={searchNo} className="btn btn-outline-info">No Availability</button>
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    Add Cellar
                </button>
                {/* Empieza el modal */}
                <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Cellar</h5>
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
                                    <div className="mb-3">
                                        <label htmlFor="inputLocation" className="form-label">Location</label>
                                        <input type="text" className="form-control" id="inputLocation" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputSize" className="form-label">Size</label>
                                        <input type="text" className="form-control" id="inputSize" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputAvailability" className="form-label">Availability</label>
                                        <input type="text" className="form-control" id="inputAvailability" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputPrice" className="form-label">Price</label>
                                        <input type="Number" className="form-control" id="inputPrice" required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={addCellar} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
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
                        <th>Location</th>
                        <th>Size</th>
                        <th>Availability</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cellars.map(({ _id, name, description, location, size, availability, price }, index) => {

                            const updateCellar = async () => {
                                try {
                                    let cellarUp = {
                                        name: document.getElementById('inputNameUp').value,
                                        description: document.getElementById('inputDescriptionUp').value,
                                        location: document.getElementById('inputLocationUp').value,
                                        size: document.getElementById('inputSizeUp').value,
                                        availability: document.getElementById('inputAvailabilityUp').value,
                                        price: document.getElementById('inputPriceUp').value
                                    }
                                    const { data } = await axios.put(`http://localhost:3000/cellar/update/${idCellar}`, cellarUp)
                                    alert('Updated Sucessfully')
                                    getCellars()
                                    resetUp()
                                } catch (err) {
                                    console.error(err)
                                }
                            }

                            const resetUp = async () => {
                                try {
                                    document.getElementById('inputNameUp').value = '',
                                        document.getElementById('inputDescriptionUp').value = '',
                                        document.getElementById('inputLocationUp').value = '',
                                        document.getElementById('inputSizeUp').value = '',
                                        document.getElementById('inputAvailabilityUp').value = '',
                                        document.getElementById('inputPriceUp').value = ''
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            const viewUpdate = async (idCellar) => {
                                try {
                                    setIdCellar(idCellar)
                                    document.getElementById('inputNameUp').defaultValue = name,
                                        document.getElementById('inputDescriptionUp').defaultValue = description,
                                        document.getElementById('inputLocationUp').defaultValue = location,
                                        document.getElementById('inputSizeUp').defaultValue = size,
                                        document.getElementById('inputAvailabilityUp').defaultValue = availability,
                                        document.getElementById('inputPriceUp').defaultValue = price
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                            return (
                                <tr className="text-center" key={index}>
                                    <Cellar
                                        name={name}
                                        description={description}
                                        location={location}
                                        size={size}
                                        availability={availability}
                                        price={price}
                                    >
                                    </Cellar>
                                    <td>
                                        <svg onClick={() => viewUpdate(_id)} type="button" className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        {/* Empieza el modal */}
                                        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Update Cellar</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form id="formUp">
                                                            <div className="mb-3">
                                                                <label htmlFor="inputNameUp" className="form-label">Name</label>
                                                                <input type="text" className="form-control" id="inputNameUp" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputDescriptionUp" className="form-label">Description</label>
                                                                <input type="text" className="form-control" id="inputDescriptionUp" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="inputLocationUp" className="form-label">Location</label>
                                                                <input type="text" className="form-control" id="inputLocationUp" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputSizeUp" className="form-label">Size</label>
                                                                <input type="text" className="form-control" id="inputSizeUp" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputAvailabilityUp" className="form-label">Availability</label>
                                                                <input type="text" className="form-control" id="inputAvailabilityUp" required />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="inputPriceUp" className="form-label">Price</label>
                                                                <input type="Number" className="form-control" id="inputPriceUp" required />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick={() => updateCellar(_id)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <svg onClick={() => deleteCellar(_id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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