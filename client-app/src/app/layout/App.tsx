import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from "uuid";
import { agent } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(a => {
        a.date = a.date.split("T")[0];
        activities.push(a);
      });
      setActivities(activities);
      setActivities(response);
      setLoading(false);
    });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);

    if (activity.id) {
      //更新
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((a) => a.id !== activity.id), activity]);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      //追加
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="読み込み中..." />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
