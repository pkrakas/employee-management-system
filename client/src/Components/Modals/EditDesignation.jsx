import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { editDesignation } from "../../Services/fetchData";
import { useSnackbar } from "notistack";

export default function EditDesignation({ designationId, title, setDepartmentsWithDesignations }) {
    const [designationTitle, setDesignationTitle] = useState(title)
    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const handleEditDesignation = () => {
        setLoading(true)
        editDesignation(designationId, { title: designationTitle })
            .then(res => {
                const updatedDesignation = res.data
                setDepartmentsWithDesignations(old => old.map((dep) => {
                        const designations = dep.designations.map(des => {
                            return des.id === designationId ? updatedDesignation : des
                        })
                        return {...dep, designations}
                    })
                )
                setLoading(false)
                closeAllModals()
            })
            .catch(err => {
                enqueueSnackbar('Failed to update designation.', {
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
            <Button fullWidth onClick={handleEditDesignation} mt="md">
                Change
            </Button>
        </>
    )
}