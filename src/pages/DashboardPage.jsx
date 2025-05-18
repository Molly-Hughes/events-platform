import { CreateAnEvent } from "../components/CreateAnEvent";
import { EventCards } from "../components/EventCards";

export function DashboardPage() {
  return (
    <>
      <CreateAnEvent />
      <h2>Manage events</h2>
      <EventCards />
    </>
  );
}
