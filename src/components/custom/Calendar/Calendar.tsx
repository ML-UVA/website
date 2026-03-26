function Calendar() {
  const calendarMode =
    document.documentElement.clientWidth < 768 ? "AGENDA" : "MONTH";

  return (
    <section className="page-section" id="calendar">
      <div className="container">
        <div className="calendar-container">
          <h2 className="text-uppercase text-center">Calendar</h2>
          <div className="container d-flex justify-content-center align-items-center mt-4">
            <iframe
              src={`https://calendar.google.com/calendar/embed?src=sigaiatuva%40gmail.com&ctz=America%2FNew_York&mode=${calendarMode}`}
              width="100%"
              height="600"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
