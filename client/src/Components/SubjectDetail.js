import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Test from './Test'
import Countdown from 'react-countdown'


export default function SubjectDetail(props) {

    const id = props.match.params.id

    const [subject, setSubject] = useState([])
    const [subjectName, setSubjectName] = useState('')
    const [userName, setUserName] = useState('')
    const [files, setFiles] = useState([])
    const [filename, setFilename] = useState([])
    const [point, setPoint] = useState()

    //DATE TIME DEADLINE

    const [time, setTime] = useState([])
    const [date, setDate] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()



    useEffect(() => {
        axios.get(`/subject/subArr/${id}`)
            .then(response => {
                setSubject(response.data)
            })

        axios.get(`/subject/${id}`)
            .then(response => {
                setSubjectName(response.data)
                console.log('SUBNAME', response.data)
            })
        axios.get(`/user/authenticated/`)
            .then(response => {
                setUserName(response.data.user)

            })
        axios.get(`/subject/subTime/${id}`)
            .then(response => {
                setTime(response.data)
            })

        axios.get(`/user/arr`)
            .then(response => {
                setFilename(response.data)
                console.log("FILENAME", response.data)
            })

    }, [])


    const onDateChange = (event) => {
        setDate(event.currentTarget.value)
    }

    const onMonthChange = (event) => {
        setMonth(event.currentTarget.value)
    }

    const onYearChange = (event) => {
        setYear(event.currentTarget.value)
    }

    const onPointChange = (event) => {
        setPoint(event.currentTarget.value)
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);


        axios.post(`/up/upload/${subjectName.subjectName}`, data)
            .then(response => {
                if (response) {
                    alert("Post success")
                    // window.location.reload()
                    console.log("DATA", response.data)
                    setFiles(response.data)

                } else {
                    alert("Error when post file")
                }
            })


    }


    const onSetTimeSubmit = () => {

        const variable = {
            date: date,
            month: month,
            year: year
        }

        axios.put(`/subject/putdate/${id}`, variable)
            .then(response => {
                if (response) {
                    alert("Put success")
                } else {
                    alert("error when put")
                }
            })

        // setTimeout(() => {
        //     props.history.push(`/subject/detail/${id}`)
        // }, 1000);

    }


    const onSetSubject = () => {
        const varriable = {
            name: "",
            fileId: "",
            subjectName: subjectName.subjectName,
        }


        axios.put(`/user/resetarr/${subjectName.subjectName}`, varriable)
            .then(response => {
                if (response) {
                    alert("Put success")
                } else {
                    alert("error when put")
                }
            })

    }

    const onSetPoint = (name, contentType, fileId) => {
        const varriable = {
            name: name,
            contentType: contentType,
            fileId: fileId
        }


        axios.put(`subject/${id}/${fileId}`, varriable)
            .then(response => {
                if (response) {
                    alert("Put success")
                } else {
                    alert("error when put")
                }
            })
    }

    const renderFileName = filename.map((file, index) => {
        if (file.subjectName === subjectName.subjectName && file.name !== "")
            return (
                <div>
                    <h3 style={{ color: "red" }}>{file.name}</h3>
                    <form method="POST" action={`/up/files/${file.fileId}/${id}?_method=DELETE`} >
                        <button className="fa fa-trash  btn btn-danger" onClick={onSetSubject}>delete</button>
                    </form>
                </div>
            )
    })



    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            const varriable = {
                name: "",
                fileId: "",
                subjectName: subjectName.subjectName,
            }

            axios.put(`/user/resetarr/${subjectName.subjectName}`, varriable)

            // Render a completed state
            return <div> </div>;
        } else {
            // Render a countdown

            return (
                <div>
                    <h6>{days} Day {hours} Hour {minutes} minute {seconds} Second</h6>
                    <form onSubmit={handleSubmit} >
                        <div className="custom-file mb-3">
                            <input type="file" name="file" id="file" />
                            <button type="submit" value="Submit" className="btn btn-primary btn-block" >Submit</button>
                        </div>
                    </form>
                    {/* {renderFileUp} */}
                    {renderFileName}

                    <br />
                </div>
            )
        }
    }

    const dates = new Date(time.year, time.month - 1, time.date, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00


    const renderSubjectDetail = subject.map((subject, index) => {
        if (subject.user === userName.username && subject.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            return (
                <div key={subject._id}>
                    <div className="card mt-3">
                        <div className="row">
                            <div className="col-10">
                                <div>{subject.name}</div>
                                <div>{subject.point}</div>
                            </div>

                            <div className="col-2">
                                <form method="POST" action={`/up/files/${subject.fileId}/${id}?_method=DELETE`} >
                                    <button className="fa fa-trash  btn btn-danger" >delete</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            )
    })

    const renderAllExercise = subject.map((subject, index) => {
        if (subject.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            return (
                <div key={subject._id}>
                    <div className="card mt-3">
                        <div className="row">
                            <div className="col-10">
                                <div><a href={`http://localhost:5000/up/document/${subject.name}`} target="_blank">{subject.name}</a></div>
                                <div>{subject.user}</div>
                                <div>{subject.timestamp}</div>
                                <div style={{ color: "red" }}>{subject.point}</div>
                            </div>

                            <div className="col-2">
                                <input
                                    placeholder="Set point"
                                    onChange={onPointChange}
                                />
                                <button className="btn btn-primary" onClick={() => {
                                    axios.put(`/subject/put/${id}/${subject.fileId}`, {
                                        name: subject.name,
                                        contentType: subject.contentType,
                                        fileId: subject.fileId,
                                        timestamp: subject.timestamp,
                                        user: subject.user,
                                        point: point
                                    })
                                }}>Point</button>
                            </div>
                        </div>

                    </div>
                </div>
            )
    })

    return (
        <div style={{ paddingLeft: "300px", paddingRight: "300px", textAlign: "center" }}>
            <h2 style={{ color: "red" }}>  {subjectName.subjectName}</h2>


            <br /><br /><br />

            <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "red" }}>DEADLINE</h4>
                <div>
                    <input
                        placeholder="Date"
                        onChange={onDateChange} />
                    <input
                        placeholder="Month"
                        onChange={onMonthChange} />
                    <input
                        placeholder="Year"
                        onChange={onYearChange} />
                    <button onClick={onSetTimeSubmit}>Submit</button>


                    <Countdown
                        date={Date.now()+5000}

                        // Date.now()+5000

                        renderer={renderer}
                    />
                </div>
            </div>



            <hr /><br /><br /><br /><br />

            <h4 style={{ color: "red" }}>Danh sach bai tap cua sinh vien A</h4>
            {renderSubjectDetail}
            {/* {renderForm} */}

            <hr /><br /><br /><br /><br />


            <h4 style={{ color: "red" }}>AllPostoFStudent</h4>
            {renderAllExercise}


        </div>

    )

}

