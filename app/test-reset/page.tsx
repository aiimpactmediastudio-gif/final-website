"use client"

export default function TestReset() {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const testLinks = [
        // Test YOUR reset link
        `${origin}/reset-password?token=test123_DIRECT_TOKEN`,

        // Test Supabase default style (mock)
        `${origin}/auth/callback?code=mock_code&type=recovery`,
    ]

    return (
        <div className="p-10 font-sans">
            <h1 className="text-2xl font-bold mb-4">Test Reset Links</h1>
            {testLinks.map((link, i) => (
                <div key={i} className="mb-4">
                    <a
                        href={link}
                        target="_blank"
                        className="text-blue-600 hover:underline break-all"
                        rel="noopener noreferrer"
                    >
                        {link}
                    </a>
                    <br />
                    <span className="text-sm text-gray-500">Opens in new tab</span>
                </div>
            ))}
            <div className="mt-8 p-4 bg-gray-100 rounded">
                <p className="font-bold">Instructions:</p>
                <ul className="list-disc ml-5">
                    <li>Click the first link to see how the Reset Page handles a direct token.</li>
                    <li>The second link simulates a callback (will fail without real code, but check redirect).</li>
                </ul>
            </div>
        </div>
    )
}
