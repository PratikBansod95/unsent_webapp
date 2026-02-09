import UnsentApp from "@/components/UnsentApp";

export default function Home() {
    return (
        <main className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-[#0F1115] to-[#1A1D24] flex flex-col items-center justify-center">
            <div className="noise-overlay" />
            <UnsentApp />
        </main>
    );
}
