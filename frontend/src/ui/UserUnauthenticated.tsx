import {Button, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import HttpClient from "../http/HttpClient";
import Box from "@mui/material/Box";

export default function UserUnauthenticated() {
    return (
        <Grid
            container
            direction="column"
            justifyContent={"center"}
            spacing={1}
            alignItems="center"
            style={{minHeight: '100vh'}}>
            <Typography sx={{marginBottom: 2}}>
                Oups, you're likely unauthenticated. Please click here to login (you'll be redirected to the login page)
            </Typography>
            <Box justifyContent={'space-between'}>
                <Button
                    variant="contained"
                    onClick={() => window.location.href = HttpClient.getAuthUrl()}>
                    Login
                </Button>
                <Button
                    onClick={() => {
                        document.location.href = '/register';
                    }}>
                    Register
                </Button>
            </Box>
        </Grid>
    );
}