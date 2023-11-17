import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Button, Grid} from "@mui/material";
import AdminContacts from "../tabs/AdminContacts";
import UsersLookup from "../tabs/UsersLookup";
import {useNavigate} from "react-router-dom";
import HttpClient from "../../http/HttpClient";
import {UserRead} from "../../dto/UserRead";
import UserProfile from "../tabs/UserProfile";
import {UsersPage} from "../../dto/UsersPage";
import {CookieStorage} from "../../utils/CookieStorage";

interface NavigationState {
    tabActualValue: number;
    admin: UserRead;
    me: UserRead;
    usersPage: UsersPage;
}

interface NavigationProps {
    initialTab: number;
}


class Navigation extends React.Component<NavigationProps, NavigationState> {

    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            tabActualValue: props.initialTab,
            me: {
                id: 0,
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                phoneNumbers: []
            },
            admin: {
                id: 0,
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                phoneNumbers: []
            },
            usersPage: {
                content: [],
                totalPages: 0,
                totalElements: 0,
                last: false,
                size: 0,
                sort: {field: '', direction: ''},
                first: false
            }
        };
    }

    loadUserProfile() {

        if (CookieStorage.hasNoToken()) document.location.href = '/unauthenticated';

        HttpClient.getMe()
            .then(user => this.setState({me: user}))
            .catch(error => {
                if (error.code === 401) {
                    document.location.href = '/unauthenticated';
                }
            });
    }

    loadAdminContacts() {

        if (CookieStorage.hasNoToken()) document.location.href = '/unauthenticated';

        HttpClient.getAdmin()
            .then(user => this.setState({admin: user}))
            .catch(error => {
                if (error.code === 401) {
                    document.location.href = '/unauthenticated';
                }
            });
    }

    loadInitialUsersPage() {

        if (CookieStorage.hasNoToken()) document.location.href = '/unauthenticated';

        HttpClient.getUsers()
            .then(usersPage => this.setState({usersPage: usersPage}))
            .catch(error => {
                if (error.code === 401) {
                    document.location.href = '/unauthenticated';
                }
            });
    }

    render() {

        return (
            <Box sx={{width: '100%'}}>

                <ClickableSection
                    initiallySelected={this.state.tabActualValue}
                    setActualIndex={(i: number) => this.setState({tabActualValue: i})}
                    loadUserProfile={() => this.loadUserProfile()}
                    loadAdminContacts={() => this.loadAdminContacts()}
                    loadInitialUsersPage={() => this.loadInitialUsersPage()}
                />
                <UserProfile hidden={this.state.tabActualValue !== 0} data={this.state.me}/>
                <AdminContacts hidden={this.state.tabActualValue !== 1} data={this.state.admin}/>
                <UsersLookup hidden={this.state.tabActualValue !== 2} data={this.state.usersPage}/>

            </Box>
        );
    }
}

interface ClickableSectionProps {
    readonly initiallySelected: number;
    setActualIndex: (i: number) => void;
    loadUserProfile: () => void;
    loadAdminContacts: () => void;
    loadInitialUsersPage: () => void;
}

function ClickableSection(props: Readonly<ClickableSectionProps>) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        props.setActualIndex(newValue);
    };

    const logout = () => {
        HttpClient.logout()
            .then(() => document.location.href = '/unauthenticated')
            .catch(error => console.log(error));
    }


    return (
        <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
            }}>
            <Grid item xs={11}>
                <Tabs value={props.initiallySelected} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label="Profile" {...a11yProps(0)}
                        onClick={() => props.loadUserProfile()}/>
                    <Tab
                        label="Admin Contacts" {...a11yProps(1)}
                        onClick={() => props.loadAdminContacts()}/>
                    <Tab
                        label="Users" {...a11yProps(2)}
                        onClick={() => props.loadInitialUsersPage()}/>
                </Tabs>
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    sx={{margin: 'auto'}}
                    onClick={() => logout()}>
                    Logout
                </Button>
            </Grid>
        </Grid>
    );
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default Navigation;
