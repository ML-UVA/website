import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  EventItem,
  getAllEventSheetData,
} from "@/components/custom/EventTemplate/useEventSheetData";
import EventTemplate from "@/components/custom/EventTemplate/EventTemplate";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { headersItems } from "@/utils/headerData.tsx";

function AppRouter() {
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEventSheetData();
        setLoading(false);
        setAllEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <BrowserRouter>
      <Routes>
        {headersItems.map((item) => (
          <Route key={item.name} path={item.link} element={item.component} />
        ))}
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        {headersItems.map((item) => (
          <Route key={item.name} path={item.link} element={item.component} />
        ))}
        {allEvents.map((item, idx) => (
          <Route
            key={item.name}
            path={item.url_name}
            element={<EventTemplate eventIdx={idx} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
