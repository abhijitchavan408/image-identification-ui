import React from "react"
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from "@mui/material";

export const LoadingBar = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}