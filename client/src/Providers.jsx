import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals'
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from 'notistack'
import { Provider as ReduxProvider } from 'react-redux'
import { Store } from './Redux/Store';

export default function Providers({ children }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <BrowserRouter>
            <ReduxProvider store={Store}>
                <SnackbarProvider maxSnack={3}>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <ModalsProvider>
                                {children}
                            </ModalsProvider>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </SnackbarProvider>
            </ReduxProvider>
        </BrowserRouter>
    )
}