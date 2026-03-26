import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-light">
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-lg-4 align-items-center justify-content-center bg-light">
            <a
              className="btn btn-dark btn-social mx-2"
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE}
              target="_blank"
              aria-label="Discord"
            >
              <i className="fab fa-discord"></i>
            </a>
            <a
              className="btn btn-dark btn-social mx-2"
              href={process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              target="_blank"
              aria-label="Mail"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              className="btn btn-dark btn-social mx-2"
              href={process.env.NEXT_PUBLIC_LINKEDIN}
              target="_blank"
              aria-label="fas linkedin-in"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn btn-dark btn-social mx-2"
              href={process.env.NEXT_PUBLIC_INSTAGRAM}
              target="_blank"
              aria-label="instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            {/* <a
      className="btn btn-dark btn-social mx-2"
      href="#!"
      aria-label="LinkedIn"
    >
      <i className="fab fa-linkedin-in"></i>
    </a> */}
          </div>
          <div className="col-lg-12 justify-content-center p-4 bg-light w-1">
            Disclaimer:{" "}
            <em>
              Although this organization has members who are University of
              Virginia students and may have University employees associated or
              engaged in its activities and affairs, the organization is not a
              part of or an agency of the University. It is a separate and
              independent organization, which is responsible for and manages its
              own activities and affairs. The University does not direct,
              supervise or control the organization and is not responsible for
              the organization's contracts, acts or omissions.
            </em>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
