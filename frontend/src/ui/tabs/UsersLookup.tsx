import * as React from "react";
import {TabProperties} from "./TabProperties";
import {Sort, UsersPage} from "../../dto/UsersPage";
import {Grid, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpClient from "../../http/HttpClient";
import {UserRead} from "../../dto/UserRead";

interface UsersLookupState {
    content: UserRead[];
    totalPages: number;
    totalElements: number;
    size: number;
    last: boolean;
    first: boolean;
    sort: Sort;

}

export interface UsersLookupProps extends TabProperties {
    data: UsersPage;
}

export default class UsersLookup extends React.Component<UsersLookupProps, UsersLookupState> {

    constructor(props: UsersLookupProps) {
        super(props);
        this.state = {
            content: props.data.content,
            totalPages: props.data.totalPages,
            totalElements: props.data.totalElements,
            size: props.data.size,
            last: props.data.last,
            first: props.data.first,
            sort: props.data.sort
        };
    }

    searchUsers(query: string) {

        if (query === "") {
            HttpClient.getUsers()
                .then(response => {
                    this.setState({
                        content: response.content,
                        totalPages: response.totalPages,
                        totalElements: response.totalElements,
                        size: response.size,
                        last: response.last,
                        first: response.first,
                        sort: response.sort
                    });
                })
                .catch(error => console.log(error));
        } else {
            HttpClient.searchUsers(query)
                .then(response => {
                    this.setState({content: response});
                })
                .catch(error => console.log(error));
        }

    }


    render() {

        if (this.props.hidden) return null;

        return (
            <Grid container direction={"column"} justifyContent={"space-around"}>
                <Grid item margin={"auto"} marginTop={"7%"}>
                    <Input
                        placeholder={"Search users"}
                        onChange={(event) => this.searchUsers(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: '30%',
                            margin: 'auto',
                            marginTop: '7%',
                        }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell align="center"><b>First Name</b></TableCell>
                                    <TableCell align="center"><b>Last Name</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.state.content
                                    && this.state.content.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">{user.email}</TableCell>
                                            <TableCell align="center">{user.firstName}</TableCell>
                                            <TableCell align="center">{user.lastName}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    }


}