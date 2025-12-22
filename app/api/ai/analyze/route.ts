import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { submissionId } = body;

        // Simulate AI Processing Delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Deterministic Mock Response based on file name or random
        const score = Math.floor(Math.random() * 20) + 80; // 80-99

        const roles = [
            "Protagonist", "Antagonist", "Supporting Lead", "Comic Relief", "Silent Type"
        ];
        const suggestedRole = roles[Math.floor(Math.random() * roles.length)];

        return NextResponse.json({
            success: true,
            data: {
                submissionId,
                aiScore: score,
                suggestedRole,
                analysis: "Subject shows strong emotional range. Lighting is adequate. Audio quality is high.",
                timestamp: new Date().toISOString()
            }
        });
    } catch {
        return NextResponse.json({ success: false, error: "AI Processing Failed" }, { status: 500 });
    }
}
