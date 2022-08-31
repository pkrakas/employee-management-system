import { Accordion, ActionIcon, Box, Group, List, LoadingOverlay, Paper, SimpleGrid, Table, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { openModal, openConfirmModal } from "@mantine/modals";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewDesignation from "../../Components/Modals/AddNewDesignation";
import EditDesignation from "../../Components/Modals/EditDesignation";
import { deleteDesignation, getDesignations } from "../../Services/fetchData";

export default function Designations() {

    const theme = useMantineTheme()
    const { organizationId } = useSelector(state => state.user)
    const [departmentsWithDesignations, setDepartmentsWithDesignations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDesignations()
            .then(res => {
                setDepartmentsWithDesignations(res.data)
                setLoading(false)
            })
    }, [])

    const AddNewDesModal = (departmentTitle, departmentId) => ({
        title: `Add new designation for ${departmentTitle}`,
        centered: true,
        children: (<AddNewDesignation departmentId={departmentId} setDepartmentsWithDesignations={setDepartmentsWithDesignations} />),
    })

    const EditDesModal = (designationId, designationTitle) => ({
        title: `Edit ${designationTitle}`,
        centered: true,
        children: <EditDesignation designationId={designationId} title={designationTitle} setDepartmentsWithDesignations={setDepartmentsWithDesignations} />
    })

    const DeleteDesModal = (designationId, designationTitle) => ({
        title: `Are you sure you want to delete ${designationTitle}?`,
        labels: { confirm: 'Confirm', cancel: 'Cancel'},
        centered: true,
        onConfirm: () => {
            deleteDesignation(designationId)
                .then(res => {
                    setDepartmentsWithDesignations(old => (
                        old.map(dep => {
                            const designations = dep.designations.filter(des => des.id !== designationId)
                            return {...dep, designations}
                        })
                    ))
                })
        }
    })

    return (<>
        <SimpleGrid cols={3} breakpoints={[
            { maxWidth: 768, cols: 1 }
        ]}>
            <Paper p={15} style={{ position: 'relative' }}>
                <LoadingOverlay visible={loading} />
                <Text size={24}>Designations</Text>
                <Accordion>
                    {departmentsWithDesignations && departmentsWithDesignations.map(department => (
                        <Accordion.Item value={department.id} key={department.id}>
                            <Accordion.Control style={{ paddingBottom: 10 }}><Text>{department.title}</Text></Accordion.Control>
                            <Accordion.Panel>
                                <List style={{ listStyleType: 'none' }}>
                                    {department.designations.map(des =>
                                        <List.Item key={des.id} style={{borderBottom: `1px solid ${theme.colors.gray[7]}`, padding: '5px 0px',
                                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[8]: theme.colors.gray[1]}}>
                                            <Box  style={{ width: '70%', textAlign: 'center', display: 'inline-block'}}>
                                                <Text>{des.title}</Text>
                                            </Box>
                                            <Box style={{width: '30%', display: 'inline-block'}}>
                                                <ActionIcon color="yellow" size="sm"
                                                style={{display: 'inline-block'}} 
                                                    onClick={() => {
                                                        openModal(EditDesModal(des.id, des.title));
                                                    }}
                                                >
                                                    <IconEdit size="sm" />
                                                </ActionIcon>
                                                <ActionIcon color="red" size="sm"style={{display: 'inline-block'}}
                                                    onClick={() => openConfirmModal(DeleteDesModal(des.id, des.title))}
                                                >
                                                    <IconTrash size="sm" />
                                                </ActionIcon>
                                            </Box>
                                        </List.Item>)}
                                </List>
                                <UnstyledButton
                                    sx={{
                                        display: 'block',
                                        width: '100%',
                                        padding: 10,
                                        borderRadius: theme.radius.sm,
                                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                                        '&:hover': {
                                            backgroundColor:
                                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                        },
                                    }}
                                    onClick={() => {
                                        openModal(AddNewDesModal(department.title, department.id));
                                    }}
                                >
                                    <Group>
                                        <IconCirclePlus size={30} />
                                        <Text size="sm" weight={500}>
                                            Add new designation
                                        </Text>

                                    </Group>
                                </UnstyledButton>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Paper>
        </SimpleGrid>
    </>)
}