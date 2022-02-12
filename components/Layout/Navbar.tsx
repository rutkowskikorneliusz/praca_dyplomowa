import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import {ChevronDownIcon, HamburgerIcon, MoonIcon, SunIcon} from '@chakra-ui/icons';
import {useUserManager} from "../../hooks/useUserManager";
import Link from "next/link"
import {showToaster} from "../../utils/toaster";
import {useAuth} from "../../context/AuthUserContext";
import React from "react";

export default function Navbar() {

    const {colorMode, toggleColorMode} = useColorMode();

    const {logOutUserWithRedirect} = useUserManager()
    const {authUser} = useAuth()
    const logOutUser = () => {
        logOutUserWithRedirect('/');
        showToaster({
            title: "Wylogowano",
            description: "Zostałeś wylogowany",
            status: "success"
        })
    }
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Link href={'/'}>
                            <Text fontSize="md">Portal</Text>
                        </Link>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{base: 'none', md: 'flex'}}>
                        </HStack>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>
                            {authUser ?
                                <Stack direction={'row'} spacing={7}>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rounded={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            minW={0}>
                                            <p>{authUser?.email} <ChevronDownIcon></ChevronDownIcon></p>
                                        </MenuButton>
                                        <MenuList alignItems={'center'}>
                                            <Link href={'/job/addNewJob'}>
                                                <MenuItem>
                                                    Dodaj nowe ogłoszenie
                                                </MenuItem>
                                            </Link>
                                            <Divider my={3}></Divider>
                                            <Link href={'/user/profile'}>
                                                <MenuItem>
                                                    Twoje ogłoszenia
                                                </MenuItem>
                                            </Link>
                                            <MenuItem onClick={() => logOutUser()}>Wyloguj</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Stack>
                                : (

                                    <Stack direction={'row'} spacing={7}>
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rounded={'full'}
                                                cursor={'pointer'}
                                                minW={0}>
                                                <HamburgerIcon></HamburgerIcon>
                                            </MenuButton>
                                            <MenuList alignItems={'center'}>
                                                <Link href={'/user/login'}>
                                                    <MenuItem>Logowanie</MenuItem>
                                                </Link>
                                                <Link href={'/user/register'}>
                                                    <MenuItem>
                                                        Rejestracja
                                                    </MenuItem>
                                                </Link>
                                            </MenuList>
                                        </Menu>
                                    </Stack>
                                )
                            }
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}