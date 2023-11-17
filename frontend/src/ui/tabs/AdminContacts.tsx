import Typography from "@mui/material/Typography";
import * as React from "react";
import {TabProperties} from "./TabProperties";
import {Grid} from "@mui/material";
import {UserRead} from "../../dto/UserRead";

interface AdminContactsProps extends TabProperties {
    data: UserRead;
}

export default class AdminContacts extends React.Component<AdminContactsProps, Object> {

    constructor(props: AdminContactsProps) {
        super(props);
    }

    render() {

        if (this.props.hidden) return null;

        const phoneNumbers = this.props.data.phoneNumbers.join(', ');

        return (
            <Grid
                container sx={{p: 3}}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={2}
                marginTop={'7%'}>
                <Grid item>
                    <Typography>Email: {this.props.data.email}</Typography>
                </Grid>
                <Grid item>
                    <Typography>First name: {this.props.data.firstName}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Last name: {this.props.data.lastName}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Phone numbers: {phoneNumbers}</Typography>
                </Grid>
            </Grid>
        );
    }
}