import useAuth from "@/hooks/useAuth";
import { Avatar, Box, Menu } from "@mantine/core";
import React from "react";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

function AccountDropdown(): React.ReactElement {
  const { logout } = useAuth();

  return (
    <Box>
      <Menu shadow="md">
        <Menu.Target>
          <Avatar className="cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown
          classNames={{
            dropdown: "rounded-lg",
          }}
        >
          <Menu.Item leftSection={<HiOutlineUser />}>Profile</Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<HiOutlineLogout />}
            onClick={logout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

export default AccountDropdown;
