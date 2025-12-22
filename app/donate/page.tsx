import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DonatePage() {
    const tiers = [
        {
            name: "Supporter",
            price: "$10",
            frequency: "monthly",
            description: "Support the platform and get basic perks.",
            features: ["Ad-free experience", "Early access to casting calls", "Supporter badge"],
            popular: false,
        },
        {
            name: "Producer",
            price: "$50",
            frequency: "monthly",
            description: "Directly fund production and get premium access.",
            features: ["All Supporter perks", "Vote on upcoming projects", "Exclusive behind-the-scenes", "Direct messaging with casting"],
            popular: true,
        },
        {
            name: "Executive",
            price: "$200",
            frequency: "monthly",
            description: "Become a major stakeholder in the ecosystem.",
            features: ["All Producer perks", "Executive Producer credit", "VIP event invites", "Access to raw AI data"],
            popular: false,
        },
    ]

    return (
        <div className="min-h-screen py-24 px-4 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Fuel the Revolution</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Your contributions power independent AI cinema. Choose a plan and become part of the movement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 ${tier.popular ? "bg-zinc-900 border-red-600 shadow-2xl shadow-red-900/20 scale-105" : "bg-black border-zinc-800 hover:border-zinc-700"}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                                <p className="text-neutral-400 text-sm mt-2">{tier.description}</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-white">{tier.price}</span>
                                <span className="text-neutral-500 ml-2">/{tier.frequency}</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-neutral-300">
                                        <Check className="h-5 w-5 text-red-500 mr-3 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                size="lg"
                                className={`w-full font-bold h-14 text-base ${tier.popular ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white text-black hover:bg-gray-200"}`}
                            >
                                Select {tier.name}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <p className="text-neutral-500">
                        Looking to make a one-time donation? <button className="text-white underline underline-offset-4 hover:text-red-500 transition-colors">Click here</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
