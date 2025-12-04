type EventData = {
    photos?: { url: string }[];
    urls?: { url: string }[];
};

export function extractEventUrls(event: EventData) {
    return {
        photoUrls: event.photos?.map((p) => p.url) ?? [],
        otherUrls: event.urls?.map((u) => u.url) ?? [],
    };
}
