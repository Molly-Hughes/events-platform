import { CreateAnEvent } from "../components/CreateAnEvent";
import { EventCards } from "../components/EventCards";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { PiHandWavingBold } from "react-icons/pi";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";

export function DashboardPage() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [totalSignUps, setTotalSignUps] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: totalCount } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });

      const today = new Date().toISOString();
      const { count: upcomingCount } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gte("date", today);

      const { count: totalSignUps } = await supabase
        .from("signups")
        .select("*", { count: "exact", head: true });

      setTotalEvents(totalCount || 0);
      setUpcomingEvents(upcomingCount || 0);
      setTotalSignUps(totalSignUps || 0);
    };

    fetchStats();
  }, []);

  return (
    <main className="p-6 bg-antiFlashWhite text-darkPurple space-y-8">
      <section className="bg-white shadow-md rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-2xl font-bold text-frenchViolet flex items-center gap-2">
            Welcome <PiHandWavingBold className="text-3xl" />
          </h1>
          <p className="text-base">
            Here's a quick look at your recent activity and stats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
          <div className="bg-white rounded-xl border p-4 text-center">
            <FaCalendarAlt className="text-frenchViolet text-xl mx-auto mb-1" />
            <p className="text-sm font-medium">Total Events</p>
            <p className="text-xl font-bold">{totalEvents}</p>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <HiOutlineLightningBolt className="text-frenchViolet text-xl mx-auto mb-1" />
            <p className="text-sm font-medium">Upcoming Events</p>
            <p className="text-xl font-bold">{upcomingEvents}</p>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <FaUsers className="text-frenchViolet text-xl mx-auto mb-1" />
            <p className="text-sm font-medium">Sign Ups</p>
            <p className="text-xl font-bold">{totalSignUps}</p>
          </div>
        </div>
      </section>

      <CreateAnEvent />

      <section className="mx-auto p-6 space-y-6 bg-white shadow-md rounded-2xl">
        <div>
          <h2 className="text-xl font-semibold text-frenchViolet">
            Manage events
          </h2>
          <p className="text-base">
            Edit, update, or delete your existing events.
          </p>
        </div>
        <EventCards />
      </section>
    </main>
  );
}
