import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Sparkles, Brain } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
                    <p className="text-gray-400">Customize your AI experience and manage your account preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav (Mock) */}
                    <div className="hidden lg:block space-y-2">
                        {[
                            { icon: Brain, label: "AI & Casting", active: true },
                            { icon: Bell, label: "Notifications", active: false },
                            { icon: Lock, label: "Privacy & Security", active: false },
                            { icon: Sparkles, label: "Appearances", active: false },
                        ].map((item) => (
                            <Button
                                key={item.label}
                                variant="ghost"
                                className={`w-full justify-start ${item.active ? "bg-red-600/10 text-red-500 hover:bg-red-600/20 hover:text-red-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                            >
                                <item.icon className="mr-3 h-4 w-4" />
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        {/* AI Preferences */}
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div>
                                        <CardTitle>AI Casting Preferences</CardTitle>
                                        <CardDescription>Configure how our Neural Engine processes your submissions.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Auto-Enhance Audio</Label>
                                        <p className="text-sm text-gray-400">Automatically clean background noise from audition tapes.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Smart Role Matching</Label>
                                        <p className="text-sm text-gray-400">Allow AI to suggest roles outside your specified types based on potential.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Deep Performance Analytics</Label>
                                        <p className="text-sm text-gray-400">Receive detailed breakdown reports on emotional range and delivery.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                        <Bell className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Notifications</CardTitle>
                                        <CardDescription>Manage your email and push alerts.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-gray-300">Casting Call Alerts</Label>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-gray-300">Application Status Updates</Label>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-gray-300">Marketing & Newsletters</Label>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button variant="ghost" className="text-gray-400 hover:text-white">Discard Changes</Button>
                            <Button className="bg-white text-black hover:bg-gray-200">Save Preferences</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
