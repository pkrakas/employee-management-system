import { Avatar, Box, Center, Group, LoadingOverlay, Text, UnstyledButton, useMantineTheme } from "@mantine/core"
import { IconBuildingSkyscraper, IconCirclePlus, IconPlus } from "@tabler/icons"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CenterLoader from "../Components/CenterLoader"
import ColorSchemeToggler from "../Components/ColorSchemeToggler"
import urls from "../Constants/urls"
import { login } from "../Redux/Slices/UserSlice"
import { getUserOrganizations, postLoginToOrganization } from "../Services/fetchData"

export default function SelectOrganization() {

    const theme = useMantineTheme()
    const [organizations, setOrganizations] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getUserOrganizations()
            .then(res => {
                if(!res.data?.length)
                    navigate(urls.CREATE_ORGANIZATION, { replace: true})
                setOrganizations(res.data)
            })
    }, [])

    const handleSelect = async organizationId => {
        setLoading(true)
        const { data } = await postLoginToOrganization({ organizationId })
        dispatch(login(data.token))
        navigate(urls.DASHBOARD.INDEX)
    }

    if(!organizations.length)
        return <CenterLoader />

    return (
        <Center style={{ width: '100%', height: '100vh' }}>
            <Box sx={{ width: '300px', position: 'relative' }}>
                <LoadingOverlay visible={loading}/>
                <div style={{ position: "absolute", top: -100, right: 0 }}>
                    <ColorSchemeToggler />
                </div>
                {organizations.map(organization => (
                    <UnstyledButton
                        key={organization.id}
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
                        onClick={() => handleSelect(organization.id)}
                    >
                        <Group>
                            <IconBuildingSkyscraper size={30} />
                            <Text size="sm" weight={500}>
                                {organization.name}
                            </Text>
                        </Group>
                    </UnstyledButton>
                ))}
                <UnstyledButton
                    sx={{
                        display: 'block',
                        width: '100%',
                        padding: theme.spacing.xs,
                        borderBottomLeftRadius: theme.radius.xs,
                        borderBottomRightRadius: theme.radius.xs,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}`,
                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        },
                    }}
                    onClick={() => { }}
                >
                    <Group>
                        <IconCirclePlus size={30} />
                        <Text size="sm" weight={500} component={Link} to={urls.CREATE_ORGANIZATION}>
                            Create new organization
                        </Text>
                    </Group>
                </UnstyledButton>
            </Box>
        </Center>)
}