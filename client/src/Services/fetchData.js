import urls from "../Constants/urls";
import axios from 'axios'

export const postLogin = data => axios.post(urls.API.LOGIN, data)
export const postRegister = data => axios.post(urls.API.REGISTER, data)
export const verifyToken = data => axios.post(urls.API.VERIFY_TOKEN, data)
export const getUserOrganizations = () => axios.get(urls.API.USER_ORGANIZATIONS)
export const createOrganization = data => axios.post(urls.API.CREATE_ORGANIZATION, data)
export const postLoginToOrganization = data => axios.post(urls.API.LOGIN_TO_ORGANIZATION, data)

export const getDepartments = () => axios.get(urls.API.GET_DEPARTMENTS)
export const addDepartment = data => axios.post(urls.API.ADD_DEPARTMENT, data)
export const editDepartment = (id, data) => axios.patch(`${urls.API.EDIT_DEPARTMENT}/${id}`, data)
export const deleteDepartment = id => axios.delete(`${urls.API.EDIT_DEPARTMENT}/${id}`)

export const getDesignations = () => axios.get(urls.API.GET_DESIGNATIONS)
export const addDesignation = data => axios.post(urls.API.ADD_DESIGNATION, data)
export const editDesignation = (id, data) => axios.patch(`${urls.API.EDIT_DESIGNATION}/${id}`, data)
export const deleteDesignation = id => axios.delete(`${urls.API.DELETE_DESIGNATION}/${id}`)