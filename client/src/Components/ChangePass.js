import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ChangePass(props) {

    const [user, setUser] = useState([])
    const [currentPass, setCurrentPass] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    // const isMatch = await bcrypt.compare(currentPass,user.password)

    



    useEffect(() => {
        axios.get('/user/authenticated')
            .then(response => {

                console.log("USER:", response.data.user)

                setUser(response.data.user)
            })
    }, [])


    const onCurrentPassChange = (event) => {
        setCurrentPass(event.currentTarget.value)
    }

    const onPassChange = (event) => {
        setPass(event.currentTarget.value)
    }

    const onConfirmPassChange = (event) => {
        setConfirmPass(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            password: pass
        }

        
        if (pass === confirmPass) {
            axios.put(`/user/reset/`, variables)
                .then(response => {
                    if (response) {
                        alert('Update success')
                        setPass('')
                        setConfirmPass('')

                        setTimeout(() => {
                        props.history.push('/')
                    }, 2000);
                    }
                })
        }else{
            alert('Invalid')
        }


    }


    return (
        <div>
            <form>
                {/* <div class="form-group">
                    <label >Current Password</label>
                    <input
                        type="password"
                        onChange={onCurrentPassChange}
                        value={currentPass} />
                </div> */}

                <div class="form-group">
                    <label >New Password</label>
                    <input
                        type="password"
                        onChange={onPassChange}
                        value={pass} />
                </div>

                <div class="form-group">
                    <label >Confirm New Password</label>
                    <input
                        type="password"
                        onChange={onConfirmPassChange}
                        value={confirmPass}
                    />
                </div>
                <button type="submit" class="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>

            <div>
                {user.password}
            </div>

        </div>
    )

}
