import { Box, Button, Center, Container, Group, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { useSnackbar } from "notistack";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ColorSchemeToggler from "../Components/ColorSchemeToggler";
import urls from "../Constants/urls";
import { postRegister } from "../Services/fetchData";

export default function Register() {

    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: value => value.length >= 3 ? null : 'Password too short',
            repeatPassword: (value, values) => value === values.password ? null : 'Passwords mismatch'
        },
    });

    const handleSubmit = async values => {
        try {
            await postRegister({
                email: values.email,
                password: values.password
            })
            enqueueSnackbar('Account successfully created.', {
                variant: 'success'
            })
            navigate(urls.LOGIN)
        } catch(error) {
            enqueueSnackbar(error.response.data.message, {
                variant: 'error'
            })
        }
    }

    if(localStorage.getItem('token'))
        return <Navigate to={urls.SELECT_ORGANIZATION} />

    return <>
        
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{position: "absolute", top: '35vh', marginRight: '-230px'}}>
                <ColorSchemeToggler />
            </div>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="Password"
                    placeholder="Password"
                    type="password"
                    {...form.getInputProps('password')}
                />
                <TextInput
                    withAsterisk
                    label="Repeat password"
                    placeholder="Repeat password"
                    type="password"
                    {...form.getInputProps('repeatPassword')}
                />
                <Group position="center" mt="md" align="center">
                    <Button type="submit">Submit</Button>
                </Group>
                <Center mt={10}>
                    <Text size={14} component={Link} to={urls.LOGIN} color="dimmed">
                        Log in instead
                    </Text>
                </Center>

            </form>
        </Box>
    </>
}