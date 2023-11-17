import * as React from "react";
import {TabProperties} from "./TabProperties";
import {Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {UserRead} from "../../dto/UserRead";

export interface UserProfileProps extends TabProperties {
    data: UserRead;
}

export default class UserProfile extends React.Component<UserProfileProps, Object> {

    constructor(props: UserProfileProps) {
        super(props);
    }

    render() {

        if (this.props.hidden) return null;

        return (
            <Grid
                container sx={{p: 3}}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={2}
                marginTop={'7%'}>
                <Grid item>
                    <Typography>Email:</Typography>
                    <TextField label={this.props.data.email}></TextField>
                </Grid>
                <Grid item>
                    <Typography>Username:</Typography>
                    <TextField label={this.props.data.username}></TextField>
                </Grid>
                <Grid item>
                    <Typography>First name:</Typography>
                    <TextField label={this.props.data.firstName}></TextField>
                </Grid>
                <Grid item>
                    <Typography>Last name:</Typography>
                    <TextField label={this.props.data.lastName}></TextField>
                </Grid>
                <Grid item>
                    <Typography>Phone numbers:</Typography>
                    {
                     this.props.data.phoneNumbers
                         .map(phoneNumber => (<TextField label={phoneNumber}></TextField>))
                    }
                </Grid>
            </Grid>
        );
    }
}
