import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Zap, Check, ArrowRight, Download } from "lucide-react"

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Billing & Credits</h1>
                        <p className="text-gray-400">Manage your subscription, credits, and payment methods.</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-8 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105">
                        <Zap className="mr-2 h-5 w-5" />
                        Get More Credits
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Credit Balance */}
                    <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-red-600/10 blur-[80px] rounded-full group-hover:bg-red-600/20 transition-all" />
                        <CardContent className="p-8 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                </div>
                                <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/10">Active Plan</Badge>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Available Credits</span>
                                <h2 className="text-6xl font-black text-white tracking-tighter">2,400</h2>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm">
                                <span className="text-gray-400">Refills automatically on Jan 1st</span>
                                <span className="text-white font-medium cursor-pointer hover:underline">View History</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Current Plan */}
                    <Card className="bg-zinc-900/50 border-white/10 col-span-1 lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Current Subscription</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Pro Creator</h3>
                                    <p className="text-2xl text-gray-400 mt-2">$29.99<span className="text-sm text-gray-500 font-normal"> / month</span></p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        Unlimited basic auditions
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        Advanced AI Analysis tools
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        Prioritized casting visibility
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        4k Video Uploads
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between space-y-4">
                                <div className="rounded-lg bg-black/40 border border-white/5 p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-10 bg-white rounded flex items-center justify-center">
                                            <div className="h-4 w-4 bg-red-500 rounded-full" />
                                            <div className="h-4 w-4 bg-orange-500 rounded-full -ml-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">•••• 4242</span>
                                            <span className="text-xs text-gray-500">Expires 12/28</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Edit</Button>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 border-white/10 hover:bg-white hover:text-black hover:border-white transition-colors">
                                        Cancel Plan
                                    </Button>
                                    <Button variant="secondary" className="flex-1 bg-white text-black hover:bg-gray-200">
                                        Upgrade Plan
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction History */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Transaction History</h3>
                        <Button variant="outline" size="sm" className="border-white/10 text-xs">
                            <Download className="mr-2 h-3 w-3" />
                            Download Invoice
                        </Button>
                    </div>

                    <Card className="bg-zinc-900/30 border-white/5">
                        <CardContent className="p-0">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                                            {i % 2 === 0 ? <CreditCard className="h-4 w-4 text-gray-400" /> : <Zap className="h-4 w-4 text-white" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{i % 2 === 0 ? "Monthly Subscription - Pro Creator" : "Credit Top-up (500 Credits)"}</p>
                                            <p className="text-xs text-gray-500">Dec {20 - i}, 2024</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">-{i % 2 === 0 ? "$29.99" : "$10.00"}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            <span className="text-xs text-gray-500 uppercase tracking-widest">Paid</span>
                                            <ArrowRight className="h-4 w-4 text-gray-600 ml-4 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
