import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router';
import {} from 'react-bootstrap'

const Details = () => {
    const { id } = useParams();
    const [record, setRecord] = useState([]);
    const getRecord = async () => {
        const res = await axios.get(`http://localhost:5000/findbyid/${id}`);
        const store = res.data;
        setRecord(store);
    }

    useEffect(() => {
        getRecord();
    }, [])
    return (
        <>
            <div className="card mb-3" style={{ maxWidth: '70%', margin: '100px', border: '2px solid black' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={record.photo}
                            alt="Trendy Pants and Shoes"
                            className="img-fluid rounded-start"
                            style={{width:'500px',height:'500px'}}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title" style={{ textAlign: 'center' }}>Employee Details</h1>
                            <hr style={{ border: '4px solid black' }} />
                            <h2 className="card-title">Name: {record.name}</h2>
                            <h2 className="card-title">Age: {record.age}</h2>
                            <h2 className="card-title">Gender: {record.gender}</h2>
                            <h2 className="card-title">Field: {record.field}</h2>
                            <h2 className="card-title">Description: </h2>
                            <p className="card-text">
                                {record.description}
                            </p>
                            {/* <p className="card-text">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </p> */}

                            <NavLink to={`/`}><Button variant="warning" style={{ margin: '5px' }}>Back</Button></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
