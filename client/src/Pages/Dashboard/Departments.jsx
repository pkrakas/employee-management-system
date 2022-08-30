import { ActionIcon, Group, LoadingOverlay, Paper, SimpleGrid, Table, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons";
import { openModal, openConfirmModal } from '@mantine/modals'
import AddNewDepartment from "../../Components/Modals/AddNewDepartment";
import { useState } from "react";
import { useEffect } from "react";
import EditDepartment from "../../Components/Modals/EditDepartment";
import { deleteDepartment, getDepartments } from "../../Services/fetchData";

export default function Departments() {

    const theme = useMantineTheme()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    const AddNewDepModal = {
        title: 'Add new department',
        centered: true,
        children: (<AddNewDepartment setDepartments={setDepartments}/>),
    }

    const EditDepModal = (id, title) => {
        return {
            title: 'Edit department',
            centered: true,
            children: (<EditDepartment id={id} title={title} setDepartments={setDepartments} />),
        }
    }

    const DeleteDepModal = (departmentId, departmentTitle) => ({
        title: `Are you sure you want to delete ${departmentTitle}?`,
        labels: { confirm: 'Confirm', cancel: 'Cancel'},
        centered: true,
        onConfirm: () => {
            deleteDepartment(departmentId)
                .then(res => {
                    setDepartments(old => (
                        old.filter(dep => dep.id !== departmentId)
                    ))
                })
        }
    })

    useEffect(() => {
        getDepartments()
            .then(res => {
                setDepartments(res.data)
                setLoading(false)
            })
    }, [])

    return (<>
        <SimpleGrid cols={3} breakpoints={[
            { maxWidth: 768, cols: 1 }
        ]}>
            <Paper p={15}  style={{position: 'relative'}}>
            <LoadingOverlay visible={loading} />
                <Text size={24}>Departments</Text>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments && departments.map(dep => <tr key={dep.id}><td>{dep.title}</td><td>
                            <ActionIcon color="yellow" size="sm" style={{ display: "inline-block" }} mr={10}
                                onClick={() => {
                                    openModal(EditDepModal(dep.id, dep.title));
                                }}
                            >
                                <IconEdit size="sm"/>
                            </ActionIcon>
                            <ActionIcon color="red" size="sm" style={{ display: "inline-block" }}
                            onClick={() => openConfirmModal(DeleteDepModal(dep.id, dep.title))}>
                                <IconTrash size="sm"/>
                            </ActionIcon>
                        </td></tr>)}
                        <tr><td>
                            <UnstyledButton
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.radius.sm,
                                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                                    '&:hover': {
                                        backgroundColor:
                                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                }}
                                onClick={() => {
                                    openModal(AddNewDepModal);
                                }}
                            >
                                <Group>
                                    <IconCirclePlus size={30} />
                                    <Text size="sm" weight={500}>
                                        Add new
                                    </Text>

                                </Group>
                            </UnstyledButton>
                        </td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Paper>
        </SimpleGrid>
    </>)
}