import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const Record = () => {
    //Fetch Record
    const [record, setRecord] = useState([]);

    //Create
    const [input, setInput] = useState({
        name: "",
        age: "",
        gender: "",
        field: "",
        description: "",
        photo: ""
    })

    //Btn Filter
    const [btnFilter, setFilter] = useState([]);

    //Pagination
    const [currenPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLastItem = currenPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;

    const currentIndex = btnFilter.slice(indexOfFirstItem, indexOfLastItem)

    const totalPage = Math.ceil(record.length / rowsPerPage)

    const btnPrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const btnNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPage))
    }

    const nextProceed = (current) => {
        setCurrentPage(current)
    }

    //Btn Search
    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        if (text == '') {
            setFilter(record)
        }
        else {
            const updatedSearch = btnFilter.filter((item) => {
                return (item.name.toLowerCase().includes(text) || item.field.toLowerCase().includes(text));
            })
            setFilter(updatedSearch)
        }
    }

    const getFilter = (cat) => {
        const updated = record.filter((e) => e.field == cat);
        setFilter(updated);
    }



    const handleChange = (event) => {
        const { name, files } = event.target;
        if (name === 'photo') {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setInput((prev) => ({
                    ...prev,
                    photo: reader.result
                }))
            }
            reader.readAsDataURL(file);
        }
        else {
            setInput((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }))
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post(`http://localhost:5000/create`, input);
        console.log(`Record Created Successfully`)
        getRecord()
    }

    const getRecord = async () => {
        const res = await axios.get(`http://localhost:5000/find`);
        const store = res.data;
        setRecord(store);
        setFilter(store);
        console.log(`All Record Fetched`)
    }

    //Delete
    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/delete/${id}`);
        console.log("Record Deleted Successfully");
        getRecord();
    }
    useEffect(() => {
        getRecord();
    }, [])

    return (
        <>
            <Form className='container' style={{ margin: '10px', padding: '20px', border: '2px solid black', borderRadius: '30px' }} onSubmit={handleSubmit}
                onReset={() => setInput({
                    name: "",
                    age: "",
                    gender: "",
                    field: "",
                    description: "",
                    photo: ""
                })}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' value={input.name} onChange={handleChange} />

                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" name='age' value={input.age} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" name='gender' value={input.gender} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Field:</Form.Label>
                    <Form.Control type="text" placeholder="Enter field" name='field' value={input.field} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name='description' value={input.description} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo Upload:</Form.Label>
                    <Form.Control type="file" name='photo' onChange={handleChange} />

                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>

                <Button variant="primary" type="reset" style={{ margin: '5px' }}>
                    Reset
                </Button>
            </Form>

            <div className="container" style={{ margin: '10px' }}>
                <b> Sort By:</b>
                <Button variant="primary" style={{ margin: '5px' }} onClick={() => setFilter(record)}>All</Button>
                <Button variant="primary" style={{ margin: '5px' }} onClick={() => getFilter("MERN")}>MERN</Button>
                <Button variant="primary" style={{ margin: '5px' }} onClick={() => getFilter("FSD")}>FSD</Button>
                <Button variant="primary" style={{ margin: '5px' }} onClick={() => getFilter("Associate")}>Associate</Button>
                <Button variant="primary" style={{ margin: '5px' }} onClick={() => getFilter("IT")}>IT</Button>

                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '400px', float: 'right' }} onChange={handleSearch} />
            </div>

            <Table striped bordered hover className='container' style={{ margin: '10px' }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Field</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentIndex.map((item, i) => (
                            <tr>
                                <td key={i}>{indexOfFirstItem + i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>
                                <td>{item.field}</td>
                                <td>{item.description}</td>
                                <td>
                                    <NavLink to={`/findbyid/${item._id}`}> <Button variant="success" style={{ margin: '5px' }}>Details</Button></NavLink>
                                    <NavLink to={`/update/${item._id}`}><Button variant="warning" style={{ margin: '5px' }}>Update</Button></NavLink>
                                    <Button variant="danger" style={{ margin: '5px' }} onClick={() => handleDelete(item._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>

            <div className="container" style={{ margin: '10px' }}>
                <Button variant="primary" style={{ margin: '5px' }} onClick={btnPrev} disabled={currenPage == 1}>Prev</Button>
                {
                    Array.from({ length: totalPage }, (_, index) => (
                        <Button variant="primary" style={{ margin: '5px' }} onClick={() => nextProceed(index + 1)} className={currenPage == index + 1 ? 'active' : ''}>{index + 1}</Button>
                    ))
                }
                <Button variant="primary" onClick={btnNext} disabled={currenPage == totalPage}>Next</Button>
            </div>
        </>
    )
}

export default Record
