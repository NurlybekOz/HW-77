
import './App.css'
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Messages from "./features/Messages/Messages.tsx";

const App = () => (
    <Container>
       <Routes>
           <Route path="/" element={<Messages/>}/>
           <Route path="/messages" element={<Messages/>}/>
           <Route path="*" element={<Typography variant='h4'>Page not found</Typography>}/>
       </Routes>
    </Container>
);

export default App
