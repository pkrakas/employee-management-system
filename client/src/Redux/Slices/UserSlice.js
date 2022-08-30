import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const initialState = {
    id: null,
    email: null,
    organizationId: null,
    organizationName: null,
    role: null,
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const token = action.payload

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('token', token)

            const { id, email, organizationId, organizationName, role } = jwtDecode(token)

            return {
                id,
                email,
                organizationId,
                organizationName,
                role,
                loggedIn: true
            }
        },
        logout: (state) => {
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = ''
            return {
                ...initialState
            }
        }
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer