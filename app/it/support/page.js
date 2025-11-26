import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItSupportPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "250px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}>
          <img src="/images/salzburg_austria_his_c717a1e9.jpg" alt="Salzburg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1 style={{ marginTop: 0 }}>Contatti e Supporto</h1>
          <p style={{ lineHeight: 1.7, color: "var(--color-muted)" }}>
            Per richieste riguardanti l'ospitalità a Salisburgo, raccomandazioni locali 
            o qualsiasi domanda sui miei servizi, non esitare a contattarmi.
          </p>

          <h2>Email</h2>
          <p>
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>

          <h2>Social Media</h2>
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
