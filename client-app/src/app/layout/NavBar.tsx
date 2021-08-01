import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export const NavBar = () => {
  const {activityStore} = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/log.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()} positive content="create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
