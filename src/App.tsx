import { useState } from "react";

import "./App.css";
import { Heading } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

// ================= pages =================
import CompetitionPage from "./competitions/CompetitionPage";
import VendorPage from "./vendors/VendorPage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Heading variant="h3"  fontWeight={"normal"}>System</Heading>
            <Routes>
                <Route path="/competitions" element={<CompetitionPage />} />
                <Route path="/vendors" element={<VendorPage />} />
            </Routes>
        </>
    );
}

export default App;
