import "./TestBlock.scss";

export function TestBlock({ title, children }) {
    return (
        <section className="TestBlock">
            <h1>{title}</h1>
            {children}
        </section>
    );
}