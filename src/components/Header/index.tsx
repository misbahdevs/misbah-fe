"use client";

import {
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useCustomSession } from "@/shared/context/context";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user } = useCustomSession();
  const router = useRouter();
  return (
    <header style={{ padding: "10px 80px", width: "100%" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading fontSize="xl">Mbooks</Heading>
        <Menu>
          <MenuButton
            as={Avatar}
            colorScheme="pink"
            _hover={{ cursor: "pointer" }}
          />
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>{`My Account (${user?.name})`}</MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
              >
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
