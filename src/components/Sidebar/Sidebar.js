import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Aside = styled.aside`
  font-size: 14px;
  line-height: 1.4;
  color: #212121;
  box-sizing: border-box;
  vertical-align: top;
  position: relative;
  display: block;
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: none;
  background-color: #fff;
  min-width: 280px;
  width: 280px;
`;

const SidebarHeader = styled.div`
  position: relative;
  height: 157.5px;
  color: white;
  background-color: #15193b;
  margin-bottom: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarImage = styled.img`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  box-sizing: border-box;
  border-style: none;
  max-width: 65px;
  max-height: 65px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
  align-self: center;
  margin-bottom: 0;
`;

const SidebarName = styled.div`
  flex: 1;
  line-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline;
  font-size: 16px;
  align-self: center;
`;

const SidebarUnorderedList = styled.ul`
  font-size: 14px;
  line-height: 1.4;
  color: #212121;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const SidebarListItem = styled.li`
  font-size: 14px;
  line-height: 1.4;
  color: #212121;
  box-sizing: border-box;
  position: relative;
  list-style-type: none;
  &:hover {
    background-color: #dce0fd;
  }
  &:focus {
    background-color: #dce0fd;
  }
`;

const SidebarInnerList = styled.ul`
  padding-left: 16px;
  margin: 0;
  &:before {
    content: attr(title);
    /* then add some nice styling as needed, eg: */
    display: block;
    font-weight: bold;
    padding-bottom: 20px;
  }
`;

const SidebarLink = styled(Link)`
  font-size: 14px;
  list-style-type: none;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  display: block;
  height: 48px;
  line-height: 48px;
  padding: 0 56px 0 16px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #212121;
  outline: none;
  &:hover {
    text-decoration: none;
    border: 2px dashed #0f29f6;
  }
  &:focus {
    border: 2px dashed #0f29f6;
  }
`;

const activeStyle = {
  backgroundColor: "#0F29F6",
  color: "white",
};

const authNav = [
  {
    link: ROUTES.HOME,
    title: "Home",
  },
  {
    link: ROUTES.ACCOUNT,
    title: "Account",
  },
  {
    link: ROUTES.ADMIN,
    title: "Admin",
  },
];

export const Sidebar = ({ className }) => {
  return (
    <Aside>
      <SidebarHeader>
        {/* <SidebarImage
          src={profilePhoto}
          alt="photo of Ana-Stefania Gheorghe with her golden retriever dog"
        /> */}
        <SidebarName> Ana-Stefania Gheorghe</SidebarName>
      </SidebarHeader>
      <SidebarUnorderedList>
        <SidebarListItem>
          <SidebarLink to={`/`} activeStyle={activeStyle}>
            Home
          </SidebarLink>
        </SidebarListItem>
        <SidebarInnerList title="Pages">
          {authNav.map((entry) => (
            <SidebarListItem>
              <SidebarLink
                key={entry.title}
                to={`/${entry.link}`}
                activeStyle={activeStyle}
              >
                {entry.title}
              </SidebarLink>
            </SidebarListItem>
          ))}
        </SidebarInnerList>
      </SidebarUnorderedList>
    </Aside>
  );
};
