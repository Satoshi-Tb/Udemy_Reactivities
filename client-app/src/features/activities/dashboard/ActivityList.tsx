import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export const ActivityList = observer(
  () => {
    const [target, setTarget] = useState("");
    const {activityStore} = useStore();
    const {deleteActivity, loading, activitiesByDate} = activityStore;

    const handleActivityDelete = (
      e: SyntheticEvent<HTMLButtonElement>,
      id: string
    ) => {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
    };

    return (
      <Segment>
        <Item.Group divided>
          {activitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => activityStore.selectActivity(activity.id)}
                    floated="right"
                    content="表示"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    loading={loading && activity.id === target}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    floated="right"
                    content="削除"
                    color="red"
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    );
  }
);
