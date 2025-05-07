import {  NextResponse } from 'next/server';

export async function GET() {
    const hobbies = [
        { label: 'Reading', value: 'reading' },
        { label: 'Traveling', value: 'traveling' },
        { label: 'Cooking', value: 'cooking' },
        { label: 'Gardening', value: 'gardening' },
        { label: 'Photography', value: 'photography' },
        { label: 'Painting', value: 'painting' },
        { label: 'Writing', value: 'writing' },
        { label: 'Hiking', value: 'hiking' },
        { label: 'Fishing', value: 'fishing' },
        { label: 'Cycling', value: 'cycling' },
        { label: 'Swimming', value: 'swimming' },
        { label: 'Dancing', value: 'dancing' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Knitting', value: 'knitting' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Running', value: 'running' },
        { label: 'Singing', value: 'singing' },
        { label: 'Drawing', value: 'drawing' },
        { label: 'Woodworking', value: 'woodworking' },
        { label: 'Birdwatching', value: 'birdwatching' }
    ];

    return NextResponse.json({
        status: 200,
        body: hobbies
    });
}