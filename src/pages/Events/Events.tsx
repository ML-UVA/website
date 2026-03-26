import "@/css/parent.css";
import "./Events.css";
import {
  getAllEventSheetData,
  EventItem,
  formatDate,
} from "@/components/custom/EventTemplate/useEventSheetData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEventSheetData();

        const upcomingEventsTmp: EventItem[] = data.filter(
          (item): item is EventItem => !item.complete
        );
        const pastEventsTmp: EventItem[] = data.filter(
          (item): item is EventItem => item.complete
        );

        setUpcomingEvents(upcomingEventsTmp);
        setPastEvents([...pastEventsTmp].reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setFadeIn(true);
        }, 200);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="full-screen-loading">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="body" id="events">
      <section
        className={`page-section ${fadeIn ? "fade-in" : ""}`}
        id="current-events"
      >
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Upcoming Events</h2>
          </div>
          <div className="row justify-content-center">
            {upcomingEvents.length ? (
              upcomingEvents.map(
                ({ time, name, banner_img_path, url_name }) => (
                  <div className="col-lg-4 col-sm-6 mb-4" key={name}>
                    <div className="events-item">
                      <Link className="events-link" to={url_name}>
                        <div className="events-hover">
                          <div className="events-hover-content">
                            <i className="fa-solid fa-arrow-right fa-3x"></i>
                          </div>
                        </div>
                        <div
                          className="img-container"
                          style={{
                            backgroundImage: `url("${banner_img_path}")`,
                          }}
                        ></div>
                      </Link>
                      <div className="events-caption">
                        <div className="events-caption-heading">{name}</div>
                        <div className="events-caption-subheading text-muted">
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="container-fluid text-center mt-2 p-4">
                No Events currently - Stay tuned for more information!
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="page-section p-5 bg-light" id="past-events">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Past Events</h2>
          </div>
          <ul className="timeline">
            {pastEvents.map(
              ({ name, date, banner_img_path, short_desc, url_name }) => (
                <li
                  key={name}
                  className={`timeline-item {index % 2 === 1 ? "timeline-inverted" : ""}`}
                >
                  <a href={url_name}>
                    <div className="timeline-image">
                      <div className="image-container">
                        <img
                          className="img-fluid"
                          src={banner_img_path}
                          alt="..."
                        />
                      </div>
                    </div>
                    <div className="timeline-panel">
                      {" "}
                      <div className="timeline-heading">
                        <h3>{formatDate(date)}</h3>
                        <h4 className="subheading text-muted">{name}</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">
                          {short_desc.substring(0, short_desc.indexOf(".")) +
                            "..."}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              )
            )}
            <li className="timeline-inverted">
              <div className="timeline-image"></div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Events;
