let initialState = {
    username: '',
    profilePic: ''
};

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case UPDATE_USER:
            return {...state, ...action.payload}
        case LOGOUT_USER:
            return {...state, }
    }
}