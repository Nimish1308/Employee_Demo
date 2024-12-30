import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams();
    //Create
    const [input, setInput] = useState({
        name: "",
        age: "",
        gender: "",
        field: "",
        description: "",
        photo: "",
    })

    //Image Preview
    const [image,setImage]=useState([]);

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
        const res = await axios.put(`http://localhost:5000/update/${id}`, input);
        console.log(`Record Updated Successfully`)
        window.alert(`Record Updated Successfully`)
        getRecord()
    }

    const getRecord = async () => {
        const res = await axios.get(`http://localhost:5000/findbyid/${id}`)
        setInput({
            name: res.data.name,
            age: res.data.age,
            gender: res.data.gender,
            field: res.data.field,
            description: res.data.description,
        })
        setImage(res.data);
    }
    useEffect(() => {
        getRecord();
    }, [])
    return (
        <>
            <Form className='container' style={{ margin: '10px', padding: '20px', border: '2px solid black', borderRadius: '30px' }} onSubmit={handleSubmit}>
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

                {
                    image.photo && (
                        <img src={image.photo}
                         style={{width:'90px',height:'90px'}}
                        />
                    )
                }
                <br/>

                <Button variant="primary" type="submit">
                    Update
                </Button>
                <NavLink to={`/`}><Button variant="warning" style={{ margin: '5px' }}>Back</Button></NavLink>
            </Form>
        </>
    )
}

export default Update
