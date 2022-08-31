import { AppShell, Navbar, Header, useMantineColorScheme, ActionIcon, Divider, MediaQuery, Burger, useMantineTheme, Title } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'
import { useState } from 'react';
import { MainLinks } from './MainLinks';
import { User } from './User'

export default function DashboardLayout({ children }) {
    const theme = useMantineTheme()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark'

    const [opened, setOpened] = useState(false)

    return (
        <AppShell
            header={<Header height={60} p="xs" style={{ border: 'none' }}>

                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="md"
                        color={theme.colors.gray[6]}
                        mt={7}
                        style={{float: 'left'}}
                    />
                </MediaQuery>
                {/* <img src="/img/logo2.png" style={{ height: '50px', marginLeft: 80, marginTop: -3 }} /> */}
                <Title style={{float: "left"}} size={32}>EMS</Title>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                    style={{ float: 'right' }}
                    mt={8}
                    mr={10}
                >
                    {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
            </Header>}
            navbarOffsetBreakpoint="sm"
            navbar={
                <Navbar width={{ sm: 200, lg: 300 }} p="xs" style={{ border: 'none' }} hiddenBreakpoint="sm" hidden={!opened}>
                    <Divider sx={{ marginTop: -9 }} />
                    <Navbar.Section mt={15} grow onClick={() => setOpened(false)}>
                        <MainLinks />
                    </Navbar.Section>
                    <Divider />
                    <Navbar.Section>
                        <User />
                    </Navbar.Section>
                </Navbar>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
                },
            })}
        >
            {children}
        </AppShell>
    )
}