import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.name || !body.hobbies || !body.avatar) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        const response = {
            success: true,
            message: 'Form submitted successfully!',
            data: body,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log(error);
    
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}