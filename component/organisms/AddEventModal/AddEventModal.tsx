import Button from "@/component/atoms/Button/Button";
import InputPlain from "@/component/atoms/Input/InputPlain";
import { Modal } from "@/component/atoms/Modal/Modal";
import SelectPlain from "@/component/atoms/Select/SelectPlain";
import { useAddEventToUser } from "@/src/apis/addUserData";
import { useAddUserDataStore } from "@/src/store/addUserData";
import { useParams } from "next/navigation";

const AddEventModal = () => {
    const isEventModalOpen = useAddUserDataStore((s) => s.isEventModalOpen);
    const setEventModalOpen = useAddUserDataStore((s) => s.setEventModalOpen);

    const setSelectedEvent = useAddUserDataStore((s) => s.setSelectedEvent);
    const selectedEvent = useAddUserDataStore((s) => s.selectedEvent);
    console.log(selectedEvent, "selectedEvent");
    const params = useParams();
    const userId = Number(params.id);

    const { mutate: addEvent } = useAddEventToUser();

    const handleAddEvent = () => {
        // Logic to add event goes here
        addEvent({ userId, eventName: selectedEvent as unknown as string });
        setEventModalOpen(false);
    };

    return (
        <Modal
            title='Add Event'
            isOpen={isEventModalOpen}
            onClose={() => {
                setEventModalOpen(false);
            }}
        >
            <div className='flex flex-col gap-[50px]'>
                <InputPlain
                    value={selectedEvent}
                    onChange={(value) => setSelectedEvent(value)}
                    label='Event Name'
                />
                <Button
                    theme='primary'
                    onClick={handleAddEvent}
                >
                    Add Event
                </Button>
            </div>
        </Modal>
    );
};

export default AddEventModal;
