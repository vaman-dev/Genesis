import Image from "next/image";
import "./contact-section.css";

const ASSETS = "/landing-pages/contact";
const AIT_MAP_EMBED =
  "https://www.google.com/maps?q=Army%20Institute%20of%20Technology%2C%20Dighi%20Hills%2C%20Alandi%20Road%2C%20Pune%20411015&output=embed";
const AIT_MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Army%20Institute%20of%20Technology%2C%20Dighi%20Hills%2C%20Alandi%20Road%2C%20Pune%20411015";

/** The original export's typography and yellow contact buttons are separate, clickable SVG assets. */
const CONTACTS = [
  {
    name: "Apoorva",
    phone: "+91 88510 65577",
    href: "tel:+918851065577",
    nameAsset: `${ASSETS}/ui/contact-name-apoorva.svg`,
    phoneAsset: `${ASSETS}/ui/contact-phone-apoorva.svg`,
    nameWidth: 210,
    nameHeight: 56,
  },
  {
    name: "Anjali",
    phone: "+91 92533 56424",
    href: "tel:+919253356424",
    nameAsset: `${ASSETS}/ui/contact-name-anjali.svg`,
    phoneAsset: `${ASSETS}/ui/contact-phone-anjali.svg`,
    nameWidth: 161,
    nameHeight: 55,
  },
] as const;

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM7.94 18.66H4.97V9.1h2.97ZM6.45 7.8a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.21 10.86h-2.97v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.38V9.1h2.85v1.31h.04a3.12 3.12 0 0 1 2.81-1.54c3 0 3.58 1.98 3.58 4.55Z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="genesis-contact" aria-labelledby="genesis-contact-heading">
      <div className="genesis-contact__background" aria-hidden="true">
        <Image
          src={`${ASSETS}/backgrounds/contact-background.webp`}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          loading="lazy"
          decoding="async"
          className="genesis-contact__background-image"
        />
      </div>

      <div className="genesis-contact__content">
        <h2 id="genesis-contact-heading" className="genesis-contact__title">
          <Image
            src={`${ASSETS}/ui/contact-title.svg`}
            alt="Contact Us"
            width={420}
            height={91}
            loading="lazy"
            decoding="async"
            className="genesis-contact__sprite"
          />
        </h2>

        <div className="genesis-contact__people" aria-label="GENESIS contact numbers">
          {CONTACTS.map((person) => (
            <div className="genesis-contact__person" key={person.name}>
              <h3 className="genesis-contact__person-name">
                <Image
                  src={person.nameAsset}
                  alt={person.name}
                  width={person.nameWidth}
                  height={person.nameHeight}
                  loading="lazy"
                  decoding="async"
                  className="genesis-contact__sprite"
                />
              </h3>
              <a
                href={person.href}
                className="genesis-contact__phone"
                aria-label={`Call ${person.name}: ${person.phone}`}
              >
                <Image
                  src={person.phoneAsset}
                  alt=""
                  aria-hidden="true"
                  width={267}
                  height={82}
                  loading="lazy"
                  decoding="async"
                  className="genesis-contact__sprite"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="genesis-contact__venue-block">
          <h3 className="genesis-contact__venue-title">
            <Image
              src={`${ASSETS}/ui/contact-venue.svg`}
              alt="Venue"
              width={153}
              height={65}
              loading="lazy"
              decoding="async"
              className="genesis-contact__sprite"
            />
          </h3>
          <div className="genesis-contact__map-frame">
            <iframe
              title="Google Map — Army Institute of Technology, Pune"
              src={AIT_MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="genesis-contact__map"
            />
          </div>
          <a
            className="genesis-contact__map-link"
            href={AIT_MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open AIT in Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <footer className="genesis-contact__footer" aria-label="GENESIS social media">
        <div className="genesis-contact__socials">
          <a
            className="genesis-contact__social"
            href="https://www.instagram.com/gdxr_ait/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GDXR AIT on Instagram"
          >
            <InstagramIcon />
            <span>INSTAGRAM</span>
          </a>
          <a
            className="genesis-contact__social"
            href="https://www.linkedin.com/company/87215024/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AIT AR/VR Club on LinkedIn"
          >
            <LinkedInIcon />
            <span>LINKEDIN</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
