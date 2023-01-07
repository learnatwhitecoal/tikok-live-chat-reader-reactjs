import { NavLink as Address } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLinkRoutes } from "../constants/common";

const DynamicLinks: NavLinkRoutes[] = [
  {
    routeName: "Home",
    link: "/",
  },
  {
    routeName: "Tiktok Live Chat",
    link: "/live",
  },
  {
    routeName: "Tiktok Analytics",
    link: "/analytics",
  },
];

interface NavLinkProps {
  data: NavLinkRoutes;
}
const AppLink = ({ data }: NavLinkProps) => (
  <Address
    className="text-lg font-bold hover:bg-none no-underline hover:underline"
    to={data?.link}
  >
    {data?.routeName}
  </Address>
);

export const CustomNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <img
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0f7d8772598ef179904134beb5451191~c5_100x100.jpeg?x-expires=1673179200&x-signature=WMoWvEpmap%2Fog9fyH6vgpOOJj1s%3D"
                alt="profile"
                className="w-[40px] h-[40px rounded-xl"
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {DynamicLinks.map((link) => (
                <AppLink data={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {DynamicLinks.map((link) => (
                <AppLink data={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
