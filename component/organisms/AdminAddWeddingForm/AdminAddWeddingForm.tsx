import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import InputPlain from "@/component/atoms/Input/InputPlain";
import { servicesformSchema } from "@/lib/types/CreateServicesSchema";
import { useCreateService } from "@/src/apis/services";
import { useCreateWeddingPackage } from "@/src/apis/wedding";
import { useState } from "react";

const AdminWeddingForm = () => {
    const { mutate: createServiceMutation, isPending } = useCreateService();
    const [value, setValue] = useState("");
    const [selectedItemsPackage, setSelectedItemsPackage] = useState<string[]>(
        [],
    );
    const { mutate: createPackage, isPending: isPackagePending } =
        useCreateWeddingPackage();

    const handleSubmit = async (data: any) => {
        console.log(data, selectedItemsPackage);

        await createPackage({
            ...data,
            items: selectedItemsPackage.map((item) => ({ name: item })),
        });
    };

    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>Add Wedding</div>
            <Container isLoading={isPending}>
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={servicesformSchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    {/* Responsive grid: 1 column on mobile, 2 on md+ */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <Input
                            name='name'
                            label='Name'
                            className='w-full'
                        />

                        <div className='flex items-end gap-[20px]'>
                            <InputPlain
                                value={value}
                                onChange={(value) => {
                                    setValue(value);
                                }}
                                label='Items'
                            />
                            <Button
                                theme='primary'
                                onClick={() => {
                                    setSelectedItemsPackage(
                                        (prevSelectedItems) => {
                                            const updatedSelectedItems = [
                                                ...prevSelectedItems,
                                                value,
                                            ];
                                            return updatedSelectedItems;
                                        },
                                    );
                                    setValue("");
                                }}
                                className='!h-[48px]'
                            >
                                +
                            </Button>
                        </div>
                        <div className='text-gray-700'>
                            {selectedItemsPackage.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </div>

                    <Button
                        type='submit'
                        className='mt-5 w-[150px] self-end'
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AdminWeddingForm;
