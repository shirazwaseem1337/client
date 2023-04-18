import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
    {
        text: "Home",
        icon: <HomeOutlined />,
    },
    {
        text: "Student Details",      // topic
        icon: null,
    },
    {
        text: "Students",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Scholarshipsss",
        icon: <ReceiptLongOutlined />,
    },

    // {
    //     text: "Sales",
    //     icon: null,
    // },
    // {
    //     text: "Overview",
    //     icon: <PointOfSaleOutlined />,
    // },
    // {
    //     text: "Daily",
    //     icon: <TodayOutlined />,
    // },
    // {
    //     text: "Monthly",
    //     icon: <CalendarMonthOutlined />,
    // },
    // {
    //     text: "Breakdown",
    //     icon: <PieChartOutlined />,
    // },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Annoucement",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Scholarship",
        icon: <AddTaskIcon />,
    },
];

// passed these properties from layout page
const Sidebar = ({ user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile }) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");      // what page we are currently on
    const navigate = useNavigate();
    const theme = useTheme();


    // anytime we are changing path we are setting the active to the correct url and determine what page we are on
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    {/* Drawer components shows like left aisa hu opens up when u click it and we making sure ke the booelean is true too */ }
    return (<Box component="nav">
        {isSidebarOpen && (
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="persistent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSixing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth,
                    },
                }}
            >

                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold">
                                    ECOMVISION
                                </Typography>
                            </Box>
                            {/* close krne ke symbol */}
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>

                    <List>
                        {navItems.map(({ text, icon }) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        {text}
                                    </Typography>
                                );
                            }
                            const lcText = text.toLowerCase()

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={() => {
                                        navigate(`/${lcText}`);
                                        setActive(lcText);
                                    }}
                                        sx={{
                                            // hove 
                                            backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                            color: active === lcText ? theme.palette.primary[100] : theme.palette.secondary[100],
                                        }}>

                                        {/* for icons */}
                                        <ListItemIcon
                                            sx={{
                                                ml: "2rem",
                                                color: active === lcText ? theme.palette.primary[100] : theme.palette.secondary[200],
                                            }}>
                                            {icon}</ListItemIcon>
                                        <ListItemText primary={text} />

                                        {active === lcText && (
                                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )

                        }
                        )}
                    </List>
                </Box>
                {/* <Box position="absolute" bottom="2rem">
                    <Divider />    

                    <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                        <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="40px"
                            width="40px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />

                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.9rem"
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                fontSize="0.8rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                {user.occupation}
                            </Typography>
                        </Box>

                        <SettingsOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "25px ",
                            }}
                        />
                    </FlexBetween>

                </Box> */}

            </Drawer>
        )
        }
    </Box>
    )
}

export default Sidebar