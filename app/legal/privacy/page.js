import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function PrivacyPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.9rem" }}>
          <h1>Datenschutzerklärung / Privacy Policy</h1>

          <section style={{ marginTop: "1.4rem" }}>
            <h2>Deutsch</h2>

            <h3>Verantwortliche Stelle</h3>
            <p>
              Verantwortlich für die Datenverarbeitung im Zusammenhang mit
              dieser Website ist:
              <br />
              Amir Ismaili, Lanserhofstraße 10, 5020 Salzburg, Österreich
              <br />
              E-Mail:{" "}
              <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
            </p>

            <h3>Server-Logs</h3>
            <p>
              Beim Aufruf dieser Website werden technische Informationen
              automatisch durch den Hosting-Anbieter verarbeitet (z. B.
              IP-Adresse in gekürzter Form, Datum und Uhrzeit des Abrufs,
              aufgerufene Seiten, verwendeter Browser). Diese Daten sind
              technisch erforderlich, um die Website stabil bereitzustellen und
              werden in Logfiles gespeichert. Eine Auswertung zu Marketingzwecken
              findet nicht statt.
            </p>

            <h3>Kontakt per E-Mail</h3>
            <p>
              Wenn Sie mich per E-Mail kontaktieren, werden die übermittelten
              Angaben (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht) zur
              Bearbeitung der Anfrage gespeichert. Diese Daten werden nicht an
              Dritte weitergegeben, sofern keine gesetzliche Verpflichtung
              besteht.
            </p>

            <h3>Cookies und lokale Speicherung</h3>
            <p>
              Diese Website verwendet keine Tracking- oder Werbe-Cookies.
              Technisch erforderliche Informationen (z. B. gewählte Sprache und
              Darstellungsmodus „Light/Dark/System“) werden lokal im Browser
              gespeichert, derzeit über <code>localStorage</code>. Diese
              Informationen verlassen Ihren Browser nicht und dienen ausschließlich
              der komfortableren Nutzung der Seite.
            </p>

            <h3>Speicherdauer</h3>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies
              zur Erreichung der genannten Zwecke erforderlich ist oder wie es
              gesetzliche Aufbewahrungspflichten vorsehen.
            </p>

            <h3>Ihre Rechte</h3>
            <p>
              Soweit anwendbar haben Sie das Recht auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung und Widerspruch gegen die
              Verarbeitung personenbezogener Daten. Anfragen hierzu können an{" "}
              <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>{" "}
              gerichtet werden.
            </p>
          </section>

          <section style={{ marginTop: "1.8rem" }}>
            <h2>English</h2>

            <h3>Controller</h3>
            <p>
              The controller responsible for data processing in connection with
              this website is:
              <br />
              Amir Ismaili, Lanserhofstraße 10, 5020 Salzburg, Austria
              <br />
              Email:{" "}
              <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
            </p>

            <h3>Server logs</h3>
            <p>
              When you access this website, the hosting provider automatically
              processes technical information (e.g. shortened IP address, date
              and time, pages accessed, browser type). This is necessary to
              provide the site reliably and securely. The data may be stored in
              log files and is not analysed for marketing purposes.
            </p>

            <h3>Contact via email</h3>
            <p>
              If you contact me by email, the data you provide (e.g. name,
              email address, message content) is stored for the purpose of
              handling your request. It is not passed on to third parties unless
              required by law.
            </p>

            <h3>Cookies and local storage</h3>
            <p>
              This site does not use advertising or analytics cookies. Technical
              preferences such as selected language and visual theme
              (Light/Dark/System) are stored locally in your browser (currently
              via <code>localStorage</code>) to make the site more convenient to
              use. This data is not transmitted to any analytics or advertising
              services.
            </p>

            <h3>Retention</h3>
            <p>
              Personal data is stored only as long as necessary for the purposes
              described above or as long as legal retention periods require.
            </p>

            <h3>Your rights</h3>
            <p>
              Depending on applicable law, you may have rights of access,
              rectification, erasure, restriction of processing and objection.
              You can exercise these rights by contacting{" "}
              <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>.
            </p>
          </section>

          <p
            className="text-muted"
            style={{ fontSize: "0.82rem", marginTop: "1.8rem" }}
          >
            This text is intended to provide transparent information about data
            handling on this private website. It does not replace tailored legal
            advice.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
