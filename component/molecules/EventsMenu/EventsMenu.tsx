import Button from "@/component/atoms/Button/Button";
import { useDeleteEventToUser } from "@/src/apis/addUserData";
import { useAddUserDataStore } from "@/src/store/addUserData";
import { useUserStore } from "@/src/store/userStore";

type EventsMenuProps = {
    id: number;
    event: { id: number; name: string };
    photos?: { url: string }[];
    urls?: { url: string }[];
};

type EventProp = {
    events: EventsMenuProps[];
};

const EventsMenu = ({ events }: EventProp) => {
    const { user } = useUserStore();
    const { type } = user || {};

    const setEventModalOpen = useAddUserDataStore((s) => s.setEventModalOpen);
    const setSelectedEventId = useAddUserDataStore((s) => s.setSelectedEventId);
    const selectedEventId = useAddUserDataStore((s) => s.selectedEventId);

    const { mutate: deleteEventToUser } = useDeleteEventToUser();

    const handleDeleteEvent = (eventId: number) => {
        // Implement event deletion logic here
        console.log("Delete event:", eventId);
        deleteEventToUser({ userEventId: eventId });
    };

    return (
        <div className='flex flex-col md:flex-row justify-between gap-4 p-4 md:p-5 bg-grey-light rounded-lg'>
            {/* Events Buttons */}
            <div className=' whitespace-nowrap scrollbar-hide py-2'>
                <div className='inline-flex gap-2 flex flex-wrap'>
                    {events?.map((event: any, index: number) => (
                        <div
                            key={index}
                            className='flex gap-2 min-w-max'
                        >
                            <Button
                                theme={
                                    selectedEventId === event.id
                                        ? "primary"
                                        : "tertiary"
                                }
                                onClick={() => setSelectedEventId(event.id)}
                            >
                                {event.event.name}
                            </Button>
                            <Button
                                theme='ghost'
                                onClick={() => handleDeleteEvent(event.id)}
                            >
                                🗑️
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Event Button */}
            {type === "Admin" && (
                <div className='mt-2 md:mt-0 flex-shrink-0'>
                    <Button
                        theme='primary'
                        onClick={() => setEventModalOpen(true)}
                    >
                        Add Event
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EventsMenu;
