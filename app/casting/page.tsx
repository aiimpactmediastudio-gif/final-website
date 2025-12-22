import { CastingForm } from "@/components/casting-form"

export default function CastingPage() {
    return (
        <div className="container max-w-2xl py-12 md:py-24">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Casting Call</h1>
                    <p className="text-muted-foreground md:text-xl">
                        Submit your profile for upcoming roles. Our AI analyzes your submission for immediate consideration.
                    </p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                    <CastingForm />
                </div>
            </div>
        </div>
    )
}
