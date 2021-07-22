import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { List, Header } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      console.log(res);
      setActivities(res.data);
    });
  }, []);
  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((act: any) => (
          <List.Item key={act.id}>{act.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;