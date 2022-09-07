import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import Cadastro from '../cadastro/Cadastro'
import Lista from '../lista/Lista'

export default function Main(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cadastro/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/lista" element={<Lista/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}