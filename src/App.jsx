import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Subscription from "./pages/Subscription";
import Transaction from "./pages/Transaction";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={
                    <>
                        <SignedIn> 
                             <Dashboard/>
                        </SignedIn>
                        <SignedOut>
                             <RedirectToSignIn/>
                        </SignedOut>
                    </>
                } />
                <Route path="/upload" element={
                    <>
                        <SignedIn> 
                            <Upload/>
                        </SignedIn>
                        <SignedOut> 
                            <RedirectToSignIn/>
                        </SignedOut>
                    </>
                } />
                <Route path="/my-files" element={
                    <>
                        <SignedIn>
                            <MyFiles />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
                    } />
                <Route path="/subscription" element={
                    <>
                        <SignedIn>
                            <Subscription />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
                     } />
                <Route path="/transaction" element={
                    <>
                        <SignedIn>
                            <Transaction />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
                } />
                <Route path="/*" element={<RedirectToSignIn/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;