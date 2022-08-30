import { Box, Button, Center, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildingSkyscraper } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import urls from "../Constants/urls";
import { createOrganization } from "../Services/fetchData";

export default function CreateOrganization() {

    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const { getInputProps, onSubmit } = useForm({
        initialValues: {
            organizationName: ''
        },
        validate: {
            organizationName: (value) => {
                if(value.length === 0)
                    return 'Name can\'t be empty'
                return value.length <= 24 ? null : 'Name too long'
            }
        }
    })

    const handleSubmit = values => {
        const { organizationName } = values
        createOrganization({ organizationName })
            .then(res => {
                enqueueSnackbar('Organization successfully created.', {
                    variant: 'success'
                })
                navigate(urls.SELECT_ORGANIZATION)
            })
            .catch(error => {
                enqueueSnackbar('Failed to create organization.', {
                    variant: 'error'
                })
            })
    }

    return (
        <Center style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <IconBuildingSkyscraper size={40} />
            <form onSubmit={onSubmit(handleSubmit)}>
                <TextInput
                    required
                    label='Organization name'
                    placeholder='Name'
                    mt={5}
                    {...getInputProps('organizationName')}
                />
                <Center>
                    <Button mt={15} type="submit">Submit</Button>
                </Center>
            </form>
        </Center>
    )
}