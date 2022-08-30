export default {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    SELECT_ORGANIZATION: '/selectOrganization',
    CREATE_ORGANIZATION: '/createOrganization',
    DASHBOARD: {
        INDEX: '/dashboard',
        DEPARTMENTS: 'departments',
        DESIGNATIONS: 'designations'
    },
    API: {
        LOGIN: `${import.meta.env.VITE_API_URL}/user/login`,
        REGISTER: `${import.meta.env.VITE_API_URL}/user/register`,
        VERIFY_TOKEN: `${import.meta.env.VITE_API_URL}/user/verifyToken`,
        USER_ORGANIZATIONS: `${import.meta.env.VITE_API_URL}/user/organizations`,
        CREATE_ORGANIZATION: `${import.meta.env.VITE_API_URL}/organization/create`,
        LOGIN_TO_ORGANIZATION: `${import.meta.env.VITE_API_URL}/organization/login`,
        GET_DEPARTMENTS: `${import.meta.env.VITE_API_URL}/department`,
        ADD_DEPARTMENT: `${import.meta.env.VITE_API_URL}/department`,
        EDIT_DEPARTMENT: `${import.meta.env.VITE_API_URL}/department`,
        DELETE_DEPARTMENT: `${import.meta.env.VITE_API_URL}/department`
    }
}