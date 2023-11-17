import {UserRead} from "./UserRead";

export interface UsersPage {
    content: UserRead[];
    totalPages: number;
    totalElements: number;
    size: number;
    last: boolean;
    first: boolean;
    sort: Sort;
}

export interface Sort {
    field: string;
    direction: string;
}