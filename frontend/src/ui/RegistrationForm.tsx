import {Button, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import HttpClient from "../http/HttpClient";
import * as React from "react";

interface RegistrationFormState {
    username: string;
    password: string;
    usernameInvalid: boolean;
    passwordInvalid: boolean;
}

export default class RegistrationForm extends React.Component<Object, RegistrationFormState> {

    constructor(props: Object) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameInvalid: false,
            passwordInvalid: false
        }
    }

    register() {
        if (this.state.password === '') {
            this.setState({passwordInvalid: true});
            return;
        }

        if (this.state.username === '') {
            this.setState({usernameInvalid: true});
            return;
        }

        HttpClient.register(this.state.username, this.state.password)
            .then(() => window.location.href = HttpClient.getAuthUrl())
            .catch(error => {
                this.setState({usernameInvalid: true, passwordInvalid: true})
            });
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justifyContent={"center"}
                spacing={2}
                alignItems="center"
                style={{minHeight: '100vh'}}>

                <Grid item>
                    {this.state.usernameInvalid && this.state.passwordInvalid &&
                        <Typography>Something was invalid (try to guess validation rules)</Typography>
                    }
                </Grid>

                <Grid item>
                    <TextField
                        id="username"
                        label="username"
                        onChange={(event) => this.setState({username: event.target.value})}
                        error={this.state.passwordInvalid}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="password"
                        label="password"
                        onChange={(event) => this.setState({password: event.target.value})}
                        error={this.state.passwordInvalid}
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" onClick={() => this.register()}>
                        submit
                    </Button>
                </Grid>

            </Grid>
        );
    }
}