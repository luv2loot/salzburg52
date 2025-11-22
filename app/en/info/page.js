import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

export default function EnInfoPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>About me</h1>
          <p>
            My name is Amir Ismaili. I live in Salzburg, Austria, and I work at
            HYPERION Hotel Salzburg as a front office apprentice (HGA) with
            experience in reception and service.
          </p>
          <p>
            I enjoy the combination of structure, communication, and calm
            problem-solving that hospitality requires – especially at the front
            desk, where every guest has a different story and expectation.
          </p>

          <h2>Languages</h2>
          <p>
            I speak English, German, Italian, French, and Spanish. Switching
            languages during one shift is normal for me – it keeps things
            dynamic and helps guests feel at home more quickly.
          </p>

          <h2>Personality</h2>
          <p>
            According to the Stefanie Stahl model, I am “IKDL” – introverted,
            concrete, logic decision-maker, relaxed. In practice, that means I
            like clear information, calm processes, and a focused way of
            working, even when the lobby is busy.
          </p>

          <h2>Online</h2>
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
            <br />
            Email: <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
