import React from 'react'
import Body from './Body'
import Header from './Header'
import { Box } from '@chakra-ui/react';

const DashBoard = () => {
  return (
    <Box py={5} px={8}>
        <Header />
        <Body />
    </Box>
  )
}

export default DashBoard