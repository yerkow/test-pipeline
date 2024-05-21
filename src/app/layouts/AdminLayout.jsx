import { AdminHeader } from '@/widgets/header'
import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AdminHeader />
            <Box sx={{marginLeft: "200px", marginTop: "64px", padding: "40px"  }} component="main">
                <Outlet />
            </Box>
        </Box>
    )
}
