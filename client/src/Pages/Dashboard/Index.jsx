import { Center, LoadingOverlay, Paper, SimpleGrid, Text, useMantineColorScheme } from "@mantine/core";
import { IconUsers } from "@tabler/icons";
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { useState } from "react";

const PaperFontSize = 28

export default function Main() {

    const [loading, setLoading] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <SimpleGrid cols={3} breakpoints={[
                { maxWidth: 600, cols: 1 }
            ]}>
                <Paper p={20} style={{ backgroundColor: 'rgba(240, 140, 0, 0.2)' }}>
                    <Text size={PaperFontSize} align="center" color='yellow'>Onboarding</Text>
                    <Center>
                        <IconUsers size={PaperFontSize} style={{ marginRight: 5 }} color="#f08c00" />
                        <Text size={PaperFontSize} align="center" color='yellow'>521</Text>
                    </Center>
                </Paper>
                <Paper p={20} style={{ backgroundColor: 'rgba(9, 146, 104, 0.2)' }}>
                    <Text size={PaperFontSize} align="center" color="teal">Developing</Text>
                    <Center>
                        <IconUsers size={PaperFontSize} style={{ marginRight: 5 }} color="#099268" />
                        <Text size={PaperFontSize} align="center" color="teal">521</Text>
                    </Center>
                </Paper>
                <Paper p={20} style={{ backgroundColor: 'rgba(156, 54, 181, 0.2)' }}>
                    <Text size={PaperFontSize} align="center" color="grape">Past</Text>
                    <Center>
                        <IconUsers size={PaperFontSize} style={{ marginRight: 5 }} color="#9c36b5" />
                        <Text size={PaperFontSize} align="center" color="grape">521</Text>
                    </Center>
                </Paper>
            </SimpleGrid>
            <SimpleGrid cols={2} mt={15} breakpoints={[
                { maxWidth: 600, cols: 1 }
            ]}>
                <Paper>
                    <Text size={PaperFontSize} mt={15} ml={15} color='rgba(255, 168, 35, 1)'>New employees</Text>
                    <Line
                        style={{ padding: 15 }}
                        data={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                            datasets: [
                                {
                                    label: '',
                                    data: [5, 6, 4, 0, 3],
                                    tension: 0.5,
                                    borderWidth: 3,
                                    borderColor: 'rgba(255, 168, 35, 1)',
                                    pointBackgroundColor: 'rgba(255, 255, 255, 0)',
                                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                                    pointBorderColor: 'rgba(66, 133, 244, 0)',
                                    pointHoverBorderColor: 'rgba(255, 168, 35, 1)',
                                    pointBorderWidth: 10,
                                    pointHoverBorderWidth: 3,
                                    pointHitRadius: 20,
                                    cubicInterpolationMode: 'monotone',
                                    fill: true,
                                    backgroundColor: (context) => {
                                        const { ctx } = context.chart;
                                        const { chartArea } = context.chart
                                        const gradient = ctx.createLinearGradient(0, chartArea.height, 0, 0);
                                        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                                        gradient.addColorStop(.5, 'rgba(255, 168, 35, 0.09)');
                                        gradient.addColorStop(1, 'rgba(255, 168, 35, 0.12)');
                                        return gradient
                                    }
                                }
                            ],
                        }}
                        options={{
                            plugins: {
                                legend: false,
                                tooltip: {
                                    backgroundColor: 'rgba(255, 168, 35)',
                                    cornerRadius: 7,
                                    mode: 'index',
                                    intersect: false,
                                    displayColors: false,
                                    xPadding: 10,
                                    yPadding: 10,
                                    titleFontColor: 'rgba(255, 255, 255, .7)',
                                    bodyFontColor: 'rgba(255, 255, 255, 1)',
                                    titleFontStyle: 'normal',
                                    bodyFontStyle: 'bold'
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        font: {
                                            size: 16
                                        }
                                    },
                                    grid: {
                                        // borderColor: 'grey',
                                        color: '#55555588'
                                    }
                                },
                                y: {
                                    ticks: {
                                        font: {
                                            size: 16
                                        }
                                    },
                                    grid: {
                                        // borderColor: 'grey',
                                        color: '#55555588'
                                    }
                                }
                            }
                        }}
                    />
                </Paper>
            </SimpleGrid>
        </div>)
}