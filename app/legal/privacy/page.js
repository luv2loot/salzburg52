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
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Datenschutzerklärung / Privacy Policy</h1>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Kurzfassung: Diese Seite sammelt so wenige personenbezogene Daten
            wie möglich. Die folgenden Hinweise erklären, was passiert und wofür
            die Daten genutzt werden. Dieser Text ist eine vereinfachte
            Vorlage und keine Rechtsberatung.
          </p>

          <h2>Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung im Rahmen dieser Website
            ist:
            <br />
            Amir Ismaili, Lanserhofstraße 10, 5020 Salzburg, Österreich
            <br />
            E-Mail:{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>

          <h2>Server-Logfiles</h2>
          <p>
            Beim Aufruf der Website werden automatisch Informationen erhoben,
            die Ihr Browser übermittelt (z. B. IP-Adresse, Zeitpunkt des
            Zugriffs, Browsertyp). Diese Daten sind technisch erforderlich, um
            die Website bereitzustellen, und werden in der Regel in
            Server-Logfiles des Hosting-Anbieters gespeichert.
          </p>

          <h2>Kontakt per E-Mail</h2>
          <p>
            Wenn Sie mich per E-Mail kontaktieren, werden die übermittelten
            Angaben (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht) zur
            Bearbeitung der Anfrage gespeichert. Diese Daten werden nicht an
            Dritte weitergegeben, es sei denn, es besteht eine rechtliche
            Verpflichtung dazu.
          </p>

          <h2>Cookies & Tracking</h2>
          <p>
            Die Seite nutzt derzeit keine Analytics-Tools wie Google Analytics
            und keine Werbetracker. Technisch notwendige Cookies können durch
            den Hosting-Anbieter oder das Framework gesetzt werden, um die
            Seite funktionsfähig zu halten.
          </p>

          <h2>Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für
            die genannten Zwecke erforderlich ist oder wie es gesetzliche
            Aufbewahrungspflichten vorsehen.
          </p>

          <h2>Ihre Rechte</h2>
          <p>
            Soweit anwendbar haben Sie Rechte auf Auskunft, Berichtigung,
            Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen die
            Verarbeitung personenbezogener Daten. Anfragen dazu können an{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a> gestellt
            werden.
          </p>

          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Hinweis: Für eine vollständig rechtskonforme Datenschutzerklärung
            (z. B. bei Einsatz weiterer Dienste) sollte professionelle Beratung
            eingeholt werden.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
