import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ListSubject(props){

    const[list,setList] = useState([])
    const[subArr,setSubArr]=useState([])

    useEffect(() => {
        axios.get('/subject')
            .then(response => {

                console.log("LIST:", response.data)

                setList(response.data)
                // setSubArr(response.data.subjectArr)

            })
    }, [])

    const renderList = list.map((list,index)=>{
        return(
        <div><Link to={`/subject/detail/${list._id}`}>{list.subjectName}</Link></div>
        )
    })

    return(
        <div>From list subject
            {renderList}
        </div>
        
    )

}