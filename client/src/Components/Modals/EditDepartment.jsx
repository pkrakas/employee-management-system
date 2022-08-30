import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useState } from "react";
import { useSnackbar } from 'notistack'
import { editDepartment } from "../../Services/fetchData";

export default function EditDepartment({ id, title, setDepartments }) {

    const [editTitle, setEditTitle] = useState(title)
    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()


    const handleEditDepartment = () => {
        setLoading(true)
        editDepartment(id, {title: editTitle})
            .then(res => {
                setDepartments(old => old.map(dep => {
                    if(dep.id === id)
                        return res.data
                    else return dep
                }))
                setLoading(false)
                closeAllModals()
            })
            .catch(err => {
                enqueueSnackbar('Failed to update department.', {
                    variant: 'error'
                })
                setLoading(false)
            })
    }

    return (
        <>
        <LoadingOverlay visible={loading}/>
            <TextInput label="Department name" placeholder="i.e. IT Consultancy" data-autofocus 
                value={editTitle} 
                onChange={e => setEditTitle(e.target.value)}
                />
            <Button fullWidth mt="md" onClick={handleEditDepartment}>
                Change
            </Button>
        
        </>
    )
}