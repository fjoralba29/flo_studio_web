import Button from "@/component/atoms/Button/Button";
import { Modal } from "@/component/atoms/Modal/Modal";
import SelectPlain from "@/component/atoms/Select/SelectPlain";
import { useAddUserDataStore } from "@/src/store/addUserData";

const AddEventModal = () => {
    const isEventModalOpen = useAddUserDataStore((s) => s.isEventModalOpen);
    const setEventModalOpen = useAddUserDataStore((s) => s.setEventModalOpen);

    const setSelectedEvent = useAddUserDataStore((s) => s.setSelectedEvent);
    return (
        <Modal
            title='Add Event'
            isOpen={isEventModalOpen}
            onClose={() => {
                setEventModalOpen(false);
            }}
        >
            <div className='flex flex-col gap-[50px]'>
                <SelectPlain
                    label='Select Event Type'
                    options={[
                        { label: "Wedding", value: "wedding" },
                        { label: "Birthday", value: "birthday" },
                        { label: "Other", value: "other" },
                        { label: "Anniversary", value: "anniversary" },
                        { label: "Engagement", value: "engagement" },
                    ]}
                    onChange={(value) => {
                        setSelectedEvent(value as any);
                    }}
                    className='!max-w-full'
                />
                <Button theme='primary'>Add Event</Button>
            </div>
        </Modal>
    );
};

export default AddEventModal;
