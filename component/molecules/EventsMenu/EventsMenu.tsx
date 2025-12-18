import Button from "@/component/atoms/Button/Button";
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

    return (
        <div className='flex bg-grey-light justify-between  gap-[20px] p-[20px] rounded-lg'>
            <div className='flex gap-[20px]'>
                {events?.map((event: any, index: number) => (
                    <div className='flex gap-[5px] w-full'>
                        <Button
                            theme={
                                selectedEventId === event.id
                                    ? "primary"
                                    : "tertiary"
                            }
                            key={index}
                            onClick={() => {
                                setSelectedEventId(event.id);
                            }}
                        >
                            {event.event.name}
                        </Button>
                        <Button theme='ghost'>🗑️</Button>
                    </div>
                ))}
            </div>
            {type === "Admin" && (
                <Button
                    theme='primary'
                    onClick={() => setEventModalOpen(true)}
                >
                    Add Event
                </Button>
            )}
        </div>
    );
};

export default EventsMenu;
