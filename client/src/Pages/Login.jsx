import { Box, Button, Center, Container, Group, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ColorSchemeToggler from "../Components/ColorSchemeToggler";
import urls from "../Constants/urls";
import { login } from "../Redux/Slices/UserSlice";
import { postLogin } from "../Services/fetchData";

export default function Login() {

    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
          email: '',
          password: ''
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: value => value.length >= 3 ? null : 'Password too short' 
        },
      });

    const handleSubmit = async values => {
        try {
            const { data } = await postLogin(values)
            dispatch(login(data.token))
            navigate(urls.SELECT_ORGANIZATION, { replace: true})
        } catch(error) {
            enqueueSnackbar(error.response.data.message, {
                variant: 'error'
            })
        }
    }

    if(localStorage.getItem('token'))
        return <Navigate to={urls.SELECT_ORGANIZATION} />

    return (
        <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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

                <Group position="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
                <Center mt={10}>
                    <Text size={14} component={Link} to={urls.REGISTER} color="dimmed">
                        Register instead
                    </Text>
                </Center>
            </form>
        </Box>
    )
}