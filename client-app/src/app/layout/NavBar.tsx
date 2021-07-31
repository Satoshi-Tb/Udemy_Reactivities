import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export const NavBar = ({openForm}: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/log.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openForm} positive content="create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
