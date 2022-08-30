import React from 'react';
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase, IconDashboard, IconChefHat, IconAccessible, IconAccessibleOff, IconBuildingWarehouse, IconUserExclamation } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text, Divider, NavLink } from '@mantine/core';
import { Link, useLocation } from "react-router-dom"

function MainLink({ icon, color, label, path }) {
    const location = useLocation()
    return (
        <NavLink to={path} component={Link} active={location.pathname === path}
            style={{padding: 0}}
            label={
                <UnstyledButton
                    sx={(theme) => ({
                        display: 'block',
                        width: '100%',
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.sm,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        },
                    })}
                >
                    <Group>
                        <ThemeIcon color={color} variant="light">
                            {icon}
                        </ThemeIcon>

                        <Text size="sm">{label}</Text>
                    </Group>
                </UnstyledButton>
            } />
    );
}

export function MainLinks() {
    return <div>
        <Text color="dimmed" size={12} style={{marginBottom: '5px'}}>Application</Text>
        <MainLink icon={<IconDashboard size={16} />} color='blue' label='Dashboard' path='/dashboard' />
        <Text color="dimmed" size={12} style={{marginTop: '10px', marginBottom: '5px'}}>Organization</Text>
        <MainLink icon={<IconBuildingWarehouse size={16} />} color='gray' label='Departments' path='/dashboard/departments' />
        <MainLink icon={<IconUserExclamation size={16} />} color='violet' label='Designations' path='/dashboard/designations' />
        <Text color="dimmed" size={12} style={{marginTop: '10px', marginBottom: '5px'}}>Employees</Text>
        <MainLink icon={<IconAlertCircle size={16} />} color='yellow' label='Onboarding' path='/dashboard/onboarding' />
        <MainLink icon={<IconAccessible size={16} />} color='teal' label='Developing' path='/dashboard/developing' />
        <MainLink icon={<IconAccessibleOff size={16} />} color='grape' label='Past' path='/dashboard/past' />
    </div>;
}