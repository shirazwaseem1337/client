import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styled from '@emotion/styled';
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import { getAnnoucements, deleteAnnoucement } from "../../state/api.js"
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import AddIcon from '@mui/icons-material/Add';

const AllAnnoucement = () => {
    const [annoucement, setAnnoucement] = useState([])
    const getAnnoucementData = async () => {
        const response = await getAnnoucements()
        console.log(response.data)      // gonna store this data in useState array ha tw initially empty array
        setAnnoucement(response.data)
    }

    useEffect(() => {
        getAnnoucementData()
    }, [])


    const deleteAnnoucementData = async (id) => {
        await deleteAnnoucement(id);
        getAnnoucementData();
    }

    return (
        <>
            <Box m="1.5rem 2.5rem" >
                <Header
                    title="ANNOUCEMENTS"
                    subtitle="View any annoucement here and update it"
                /></Box>

            <Button sx={{ float: "right", fontSize: "15px", color: "#0d696e", margin: "0px 50px" }} component={NavLink} to={`/annoucement/add`}><AddIcon />Add Annoucement</Button>


            <TABLEBODY>
                <TableHead className='tablehead'>
                    <TableCell>Title</TableCell>
                    <TableCell>Annoucement</TableCell>

                    <TableCell></TableCell>


                </TableHead>

                <TableBody>
                    {annoucement.map((currElem) => {
                        return (
                            <TableRow key={annoucement._id} className='tablerow'>
                                <TableCell>{currElem.name}</TableCell>
                                <TableCell>{currElem.textfield}</TableCell>


                                <TableCell>
                                    <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={NavLink} to={`/annoucement/edit/${currElem._id}`}>Edit</Button> {/* change it to currElem.id to use JSON Server */}
                                    <Button color="secondary" variant="contained" onClick={() => deleteAnnoucementData(currElem._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                                </TableCell>

                            </TableRow>
                        )

                    })}


                </TableBody>
            </TABLEBODY>
        </>
    )
}


const TABLEBODY = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;

    

    .tablehead{
        & > th {            // table cells inspect mein th ha
        font-size: 18px;
        background: #0d696e;
        color: #FFFFFF;
    }
    }
    
    .tablerow{
        & > td{
        font-size: 15px;
        
    }
    }
`

export default AllAnnoucement