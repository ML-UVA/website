import {
  useEventSheetData,
  formatDate,
  extractGoogleMapsLink,
} from "./useEventSheetData";
import "./EventTemplate.css";
import "@/css/parent.css";
import Carousel from "react-bootstrap/Carousel";

interface EventTemplateProps {
  eventIdx: number;
}

function EventTemplate({ eventIdx }: EventTemplateProps) {
  const { eventItem, loading, fadeIn, linkList, longDescList, imgPathList } =
    useEventSheetData(eventIdx);

  if (loading) {
    return (
      <div className="full-screen-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={`main-event-body ${fadeIn ? "fade-in" : ""}`}>
      <header className="masthead">
        <img
          src={
            eventItem.banner_img_path
              ? eventItem.banner_img_path
              : "..//img/sigai-header-banner.jpg"
          }
          alt="Background"
          className="background-img"
          referrerPolicy="no-referrer"
        />
        <div className="overlay"></div>
        <div className="container">
          <div className="masthead-heading text-uppercase">
            {eventItem.name}
          </div>
          <div className="masthead-subheading">
            {formatDate(eventItem.date)}
          </div>
          <div className="masthead-subheading">{eventItem.time}</div>
          {linkList && (
            <a className="btn btn-primary btn-lg" href={linkList[0].link}>
              {linkList[0].name}
            </a>
          )}
        </div>
      </header>
      <section>
        <div className="container-fluid short-container bg-light">
          <div className="row justify-content-center">
            <div className="col-md-5 text-center half-carasoul">
              {imgPathList.length ? (
                <Carousel data-bs-theme="dark" className="carasoul">
                  {imgPathList.map((item, idx) => (
                    <Carousel.Item interval={5000} key={idx}>
                      <a href={item} target="_blank">
                        <img
                          className="img-fluid"
                          src={item}
                          alt={item}
                          referrerPolicy="no-referrer"
                        />
                      </a>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  className="img-fluid"
                  src="..//img/placeholder-events-dark.jpg"
                  alt="Portfolio"
                ></img>
              )}
            </div>
            <div className="col-md-4 text-start short-desc">
              <h4 className="my-3">{eventItem.header1}</h4>
              <p className="text-muted">{eventItem.short_desc}</p>
            </div>
          </div>
        </div>
        <div className="container-fluid long-container text-center">
          {longDescList.length > 0 ? (
            <div className="container">
              {eventItem.header2 && (
                <h2 className="section-heading">{eventItem.header2}</h2>
              )}
              <div className="row justify-conent-center mt-5 mb-5">
                {longDescList.map(({ header, content }, index) => (
                  <div
                    className={`col-lg-${12 / longDescList.length}`}
                    key={index}
                  >
                    <h4 className="sub-header">{header}</h4>
                    <p className="text-muted">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="row justify-content-center">
            {linkList.map(({ name, link }, index) => (
              <div className={`col-lg-${12 / linkList.length}`} key={index}>
                <a href={link} className="link-with-icon">
                  <span>{name}</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="container-fluid long-container text-center bg-light location-container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              {eventItem.google_maps_link ? (
                <iframe
                  width="100%"
                  height="300px"
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    import.meta.env.VITE_GCLOUD_API_KEY
                  }&q=${encodeURIComponent(
                    extractGoogleMapsLink(eventItem.google_maps_link)
                  )}`}
                ></iframe>
              ) : (
                <img src="..//img/portfolio/1.jpg" alt="Portfolio"></img>
              )}
            </div>
            <div className="col-lg-4 text-start">
              <div>
                <h4 className="my-3">Location and Time</h4>
                <div>
                  {eventItem.location_long
                    ? eventItem.location_long
                    : eventItem.location}
                </div>
                <div>{eventItem.time}</div>
              </div>
              <div>
                <h4 className="my-3">Questions?</h4>
                contact us at{" "}
                <a href="mailto:contact-ml@virginia.edu">
                  contact-ml@virginia.edu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventTemplate;
