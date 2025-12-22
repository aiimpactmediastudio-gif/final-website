export default function SponsorsPage() {
    const platinumSponsors = [
        { name: "TechCorp Global", logo: "TC" },
        { name: "FutureVision AI", logo: "FV" },
    ]

    const goldSponsors = [
        { name: "Studio One", logo: "S1" },
        { name: "MediaLink", logo: "ML" },
        { name: "Casting Direct", logo: "CD" },
    ]

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-12">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Partners</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powering the next generation of cinema with industry-leading support.
                    </p>
                </div>

                {/* Platinum Tier */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold border-l-4 border-red-600 pl-4 tracking-wider">PLATINUM PARTNERS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {platinumSponsors.map((sponsor, i) => (
                            <div key={i} className="h-64 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center hover:bg-neutral-800 transition-all cursor-pointer group hover:border-red-600/50 hover:scale-[1.01] duration-300">
                                <div className="text-6xl font-black text-neutral-700 group-hover:text-white transition-colors">
                                    {sponsor.logo}
                                </div>
                                <p className="mt-4 text-lg font-medium text-neutral-500 group-hover:text-neutral-300">{sponsor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gold Tier */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 tracking-wider">GOLD PARTNERS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {goldSponsors.map((sponsor, i) => (
                            <div key={i} className="h-48 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center hover:bg-neutral-800 transition-all cursor-pointer group hover:border-yellow-500/50 hover:scale-[1.01] duration-300">
                                <div className="text-4xl font-black text-neutral-700 group-hover:text-white transition-colors">
                                    {sponsor.logo}
                                </div>
                                <p className="mt-4 text-base font-medium text-neutral-500 group-hover:text-neutral-300">{sponsor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-900 p-12 text-center space-y-6">
                    <h3 className="text-3xl font-bold text-white">Become a Sponsor</h3>
                    <p className="text-white/80 max-w-xl mx-auto text-lg">
                        Join us in shaping the future of AI-driven media. Get exclusive visibility and access to top-tier talent.
                    </p>
                    <button className="bg-white text-red-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        Contact Partnership Team
                    </button>
                </div>
            </div>
        </div>
    )
}
