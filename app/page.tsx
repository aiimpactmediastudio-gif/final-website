import { Hero } from "@/components/hero"
import { ContentRow } from "@/components/content-row"
import { TokenCatcher } from "@/components/auth/token-catcher"

export default function Home() {
  const trendingNow = [
    { id: "1", title: "The Cyber Age", image: "", match: 98, duration: "2025", genre: ["Sci-Fi"] },
    { id: "2", title: "Lost in Echoes", image: "", match: 95, duration: "2024", genre: ["Drama"] },
    { id: "3", title: "Silicon Souls", image: "", match: 92, duration: "2025", genre: ["Thriller"] },
    { id: "4", title: "Red Protocol", image: "", match: 89, duration: "2024", genre: ["Action"] },
    { id: "5", title: "Neural Link", image: "", match: 85, duration: "2025", genre: ["Docu"] },
    { id: "6", title: "Zero Day", image: "", match: 99, duration: "2025", genre: ["Thriller"] },
  ]

  const newSubmit = [
    { id: "7", title: "Voice of Tomorrow", image: "", match: 88, duration: "2025", genre: ["Audio"] },
    { id: "8", title: "Project: Genesis", image: "", match: 84, duration: "2024", genre: ["Sci-Fi"] },
    { id: "9", title: "Deep Fake Love", image: "", match: 91, duration: "2025", genre: ["Romance"] },
    { id: "10", title: "Algorithm Breach", image: "", match: 96, duration: "2024", genre: ["Crime"] },
  ]

  return (
    <main className="relative min-h-screen flex-col bg-black pb-20 overflow-x-hidden">
      <TokenCatcher />
      {/* Hero Section */}
      <Hero />

      {/* Main Content Area - Overlapping with Hero */}
      <div className="relative z-30 -mt-32 space-y-12 pl-4 lg:pl-0 bg-transparent">
        {/* Gradient Mask to smooth transition */}
        <div className="absolute top-[-100px] inset-x-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

        <ContentRow title="Trending Now" items={trendingNow} />
        <ContentRow title="New Submissions" items={newSubmit} />
        <ContentRow title="AI Recommended for You" items={[...newSubmit, ...trendingNow].sort(() => 0.5 - Math.random())} />
        <ContentRow title="Action & Thriller" items={trendingNow} />
      </div>
    </main>
  );
}
