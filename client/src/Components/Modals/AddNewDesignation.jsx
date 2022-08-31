import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useState } from "react";
import axios from "axios";
import { addDesignation } from "../../Services/fetchData";
import { useSnackbar } from "notistack";

export default function AddNewDesignation({ departmentId, setDepartmentsWithDesignations }) {
    const [designationTitle, setDesignationTitle] = useState('')
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)

    const handleAddDesignation = () => {
        setLoading(true)
        addDesignation({title: designationTitle, departmentId})
            .then(res => {
                const newDesignation = res.data
                setDepartmentsWithDesignations(old => {
                    return old.map((dep) => {
                        if(dep.id === departmentId)
                            dep.designations.push(newDesignation)
                        return dep
                    })
                })
                closeAllModals()
            })
            .catch(error => {
                enqueueSnackbar('Failed to add designation.', {
                    variant: 'error'
                })
                setLoading(false)
            })
        
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <TextInput label="Designation title" placeholder="i.e. Project Manager" data-autofocus 
                value={designationTitle}
                onChange={e => setDesignationTitle(e.target.value)}    
            />
            <Button fullWidth onClick={handleAddDesignation} mt="md">
                Submit
            </Button>
        </>
    )
}