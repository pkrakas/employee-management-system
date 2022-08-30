import { Box, Button, LoadingOverlay, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { addDepartment } from "../../Services/fetchData";

export default function AddNewDepartment({ setDepartments }) {
    const [departmentTitle, setDepartmentTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const handleAddDepartment = () => {
        setLoading(true)
        addDepartment({title: departmentTitle})
            .then(res => {
                const newDepartment = res.data
                setDepartments(old => { return [ ...old, newDepartment ] })
                setLoading(false)
                closeAllModals()
            })
            .catch(error => {
                enqueueSnackbar('Failed to add department.', {
                    variant: 'error'
                })
                setLoading(false)
            })
    }

    return (
        <Box style={{position: "relative"}}>
            <LoadingOverlay visible={loading} />
            <TextInput label="Department name" placeholder="i.e. IT Consultancy" data-autofocus 
                value={departmentTitle}
                onChange={e => setDepartmentTitle(e.target.value)}    
            />
            <Button fullWidth onClick={handleAddDepartment} mt="md">
                Submit
            </Button>
        </Box>
    )
}