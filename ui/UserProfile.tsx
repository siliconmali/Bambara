"use client";
import { Avatar, Button, Divider, Popover } from "antd";
import { CircleArrowDown, LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

type Props = {
  user?: any;
};

function UserProfile({ user }: Props) {
  function getInitials(
    firstNameInitial: string,
    lastNameInitial: string
  ): React.ReactNode {
    return `${firstNameInitial}${lastNameInitial}`;
  }

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <div>
      <Popover
        placement="bottomRight"
        className="hidden md:flex"
        trigger="click"
        arrow={false}
        overlayStyle={{
          top: "65px",
          width: "200px",
        }}
        content={
          <div className="flex flex-col gap-3 items-center justify-center">
            <div>
              <p className="m-0 p-0 font-bold">
                {user?.surname} {user?.lastName}
              </p>
              {user?.email}
            </div>
            <Divider style={{ margin: 0 }} />
            <Button
              type="primary"
              className={
                "block w-full cursor-pointer rounded-md text-sm font-medium"
              }
              onClick={handleLogout}
              loading={loading}
            >
              Sign out
            </Button>
            <Divider style={{ margin: 0 }} />
          </div>
        }
      >
        <div className="relative">
          <Avatar size={"large"} className="bg-content-default">
            <div className="text-lg font-bold">
              {getInitials(
                (user?.surname || "").charAt(0),
                (user?.lastName || "").charAt(0)
              )}
            </div>
          </Avatar>
          <CircleArrowDown className="absolute size-5 -left-3 rounded-full top-5 bg-surface-default font-bold" />
        </div>
      </Popover>
      <div className="md:hidden flex items-center justify-between">
        <div className=" flex w-full items-center  gap-2">
          <Avatar size={"large"} className="bg-content-default">
            <div className="text-lg font-bold">
              {getInitials(
                (user?.surname || "").charAt(0),
                (user?.lastName || "").charAt(0)
              )}
            </div>
          </Avatar>
          <div className="flex flex-col  text-primary-defaul">
            <p className="my-0 font-bold">
              {user?.surname} {user?.lastName}
            </p>
            <p className="my-0">{user?.email}</p>
          </div>
        </div>
        <LogOutIcon
          onClick={handleLogout}
          className="text-content-default hover:text-primary-default"
        />
      </div>
    </div>
  );
}

export default UserProfile;
