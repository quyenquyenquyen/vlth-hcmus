import React, { Component, useState } from 'react'
import axios from 'axios'

export default function CreateSubject(props) {


    const [subject, setSubject] = useState('')


    const onChange = (event) => {
        setSubject(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();


        const variables = {
            subjectName: subject
        }
        console.log(variables)

        axios.post(`/subject/create`, variables)
            .then(response => {
                if (response) {
                    alert('Post Created!')
                } else {
                    alert('Error when create subject')
                }
            })

    }


    return (
        <div>
            <input
                placeholder="Subject Name"
                value={subject}
                onChange={onChange} />
            <button className="btn btn-primary" onClick={onSubmit}> Create Subject </button>
        </div>
    )

}
