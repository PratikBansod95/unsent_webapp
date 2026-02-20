import UnsentApp from "@/components/UnsentApp";

export default function Home() {
    return (
        <main className="relative h-dvh w-full overflow-hidden flex flex-col items-center justify-center">
            <div className="noise-overlay" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_115%,rgba(232,168,124,0.14)_0%,rgba(232,168,124,0.04)_45%,transparent_72%)]" />
            <UnsentApp />
        </main>
    );
}
