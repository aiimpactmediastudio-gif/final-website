import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Film, Award, TrendingUp, Activity, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Cinematic Hero Section */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2622&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute bottom-4 right-8 z-20">
                    <Button variant="outline" className="bg-black/50 border-white/20 hover:bg-white hover:text-black backdrop-blur-sm transition-all">
                        <Camera className="mr-2 h-4 w-4" />
                        Edit Cover
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* User Profile Card */}
                    <div className="w-full md:w-[350px] space-y-6">
                        <Card className="bg-zinc-900/90 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="relative inline-block">
                                    <Avatar className="h-32 w-32 border-4 border-black shadow-xl mx-auto">
                                        <AvatarImage src="/avatars/01.png" alt="Profile" />
                                        <AvatarFallback className="text-4xl bg-zinc-800">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-black">
                                        PRO
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-white">James "Vito" Doe</h1>
                                    <p className="text-red-500 font-medium">Lead Actor • Screenwriter</p>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5 border-b">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-white">24</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Castings</div>
                                    </div>
                                    <div className="text-center border-l border-white/5 border-r">
                                        <div className="text-xl font-bold text-white">12</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Call-backs</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-white">85%</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Match Rate</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Profile Completion</span>
                                        <span>92%</span>
                                    </div>
                                    <Progress value={92} className="h-1.5 bg-zinc-800" />
                                </div>

                                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold transition-all transform hover:scale-[1.02]">
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6 w-full">
                        {/* Status Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Auditions Submitted</p>
                                        <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-red-500 transition-colors">142</h3>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                        <Film className="h-6 w-6 text-red-500" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Profile Views</p>
                                        <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-red-500 transition-colors">1,204</h3>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                        <Activity className="h-6 w-6 text-red-500" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Awards Won</p>
                                        <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-red-500 transition-colors">3</h3>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                        <Award className="h-6 w-6 text-red-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content Tabs */}
                        <Tabs defaultValue="activity" className="w-full">
                            <TabsList className="bg-zinc-900/50 border border-white/5 p-1">
                                <TabsTrigger value="activity" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Activity Feed</TabsTrigger>
                                <TabsTrigger value="media" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Media Gallery</TabsTrigger>
                                <TabsTrigger value="resume" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Resume</TabsTrigger>
                            </TabsList>
                            <TabsContent value="activity" className="mt-6 space-y-4">
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex gap-4 p-4 rounded-lg bg-zinc-900/30 border border-white/5 hover:border-red-500/30 transition-all">
                                            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                                <TrendingUp className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">Application Sent for "The Dark Horizon"</h4>
                                                <p className="text-xs text-gray-400 mt-1">Your audition tape was submitted successfully. The casting director has been notified.</p>
                                                <span className="text-[10px] text-gray-500 mt-2 block">2 hours ago</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="media" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-video bg-zinc-900 rounded-lg border border-white/5 relative group cursor-pointer overflow-hidden">
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Film className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
