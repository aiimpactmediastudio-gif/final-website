"use client"

import { useState, useRef } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, X, CheckCircle } from "lucide-react"

export function CastingForm() {
    const [headshot, setHeadshot] = useState<File | null>(null)
    const [reel, setReel] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const headshotInputRef = useRef<HTMLInputElement>(null)
    const reelInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'headshot' | 'reel') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (type === 'headshot') setHeadshot(file)
            if (type === 'reel') setReel(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!headshot) {
            setError("Please upload a headshot.")
            return
        }

        setIsUploading(true)
        setError(null)
        setUploadProgress(0)

        try {
            const supabase = supabaseBrowser
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                throw new Error("You must be logged in to submit.")
            }

            // Mocking upload progress for visual feedback as Supabase standard client doesn't support progress events easily 
            // without XMLHttpRequest wrapping, but in a real app, we'd use XHR or TUS.
            // For now, we simulate progress steps.
            const simulateProgress = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(simulateProgress)
                        return 90
                    }
                    return prev + 10
                })
            }, 500)

            // Upload Headshot
            const headshotPath = `${user.id}/${Date.now()}_${headshot.name}`
            const { error: uploadError } = await supabase.storage
                .from('casting-submissions')
                .upload(headshotPath, headshot)

            if (uploadError) throw uploadError

            // Record in Database
            const { error: dbError } = await supabase
                .from('casting_submissions')
                .insert({
                    user_id: user.id,
                    headshot_url: headshotPath,
                    status: 'pending',
                })

            if (dbError) throw dbError

            clearInterval(simulateProgress)
            setUploadProgress(100)
            setIsSuccess(true)
        } catch (err: any) {
            setError(err.message || "An error occurred during submission.")
        } finally {
            setIsUploading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Submission Received</h2>
                <p className="text-muted-foreground">
                    Your profile has been sent to our AI casting engine. We will contact you if there's a match.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                    Submit Another
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="headshot" className="text-lg font-semibold">
                        Headshot
                    </Label>
                    <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => headshotInputRef.current?.click()}
                    >
                        {headshot ? (
                            <div className="relative group">
                                <img
                                    src={URL.createObjectURL(headshot)}
                                    alt="Headshot preview"
                                    className="h-48 w-48 object-cover rounded-md shadow-md"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity">
                                    <span className="text-white text-sm font-medium">Change</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-2">
                                <div className="bg-primary/10 p-4 rounded-full inline-flex">
                                    <Upload className="h-8 w-8 text-primary" />
                                </div>
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground/75">JPG, PNG up to 10MB</p>
                            </div>
                        )}
                        <input
                            type="file"
                            id="headshot"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'headshot')}
                            ref={headshotInputRef}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="reel" className="text-lg font-semibold">
                        Acting Reel (Optional)
                    </Label>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reelInputRef.current?.click()}
                            className="w-full h-12 dashed"
                        >
                            {reel ? <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> : <Upload className="mr-2 h-4 w-4" />}
                            {reel ? reel.name : "Upload Video Reel"}
                        </Button>
                        <input
                            type="file"
                            id="reel"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, 'reel')}
                            ref={reelInputRef}
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                    {error}
                </div>
            )}

            {isUploading && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                </div>
            )}

            <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isUploading}>
                {isUploading ? "Submitting..." : "Submit Application"}
            </Button>
        </form>
    )
}
