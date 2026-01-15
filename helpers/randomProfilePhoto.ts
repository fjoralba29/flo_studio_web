export interface Photo {
    id: number;
    title: string | null;
    description: string | null;
    url: string;
    // Add other fields from your DB here (e.g., url: string)
}

export interface EventDetail {
    id: number;
    name: string;
    createdAt: string; // or Date if you parse it
}

export interface UserEvent {
    id: number;
    userId: number;
    eventId: number;
    urls: string[]; // This is the array of strings in your snippet
    createdAt: string;
    event: EventDetail;
    photos: Photo[];
}

export const getRandomPhotoFromEvents = (events: UserEvent[] | undefined) => {
    // 1. Check if events exists and has items
    if (!events || events.length === 0) return null;

    // 2. Filter events that have at least one photo in the photos array
    const eventsWithPhotos = events.filter(
        (e) => e.photos && Array.isArray(e.photos) && e.photos.length > 0
    );

    if (eventsWithPhotos.length === 0) return null;

    // 3. Calculate random index safely
    const randomEventIndex = Math.floor(
        Math.random() * eventsWithPhotos.length
    );
    const randomEvent = eventsWithPhotos[randomEventIndex];

    // 4. Double check the photos array inside the chosen event
    const photosList = randomEvent.photos;
    const randomPhotoIndex = Math.floor(Math.random() * photosList.length);

    const randomPhoto = photosList[randomPhotoIndex];

    return {
        photo: randomPhoto,
        // Using optional chaining and fallback to prevent "reading property of undefined"
        url: randomEvent.urls?.[0] || "",
        eventName: randomEvent.event?.name || "Event",
    };
};
