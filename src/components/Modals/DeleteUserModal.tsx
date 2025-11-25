import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import { ParamValue } from 'next/dist/server/request/params';
import { useRouter } from 'next/navigation';

import { MainBtn } from '../MainBtn';
import { deleteUserById } from '@/api/user-management/deleteUserById';

export const DeleteUserModal = ({
  isOpenModal,
  setIsOpenModal,
  userId,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  userId: string | ParamValue;
}) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteUserById(id, () => router.push('/users')),
  });

  const handleSubmit = () => {
    mutate(userId as string);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Hesabı sil"
      onCancel={() => setIsOpenModal(false)}
      footer={[]}
    >
      <p className="text-light mb-6">Hesabı silmək istədiyinə əminsiniz?</p>

      <div className="flex gap-4 mt-10">
        <MainBtn
          variant="outline"
          text="Ləğv et"
          className="w-full"
          onClick={() => setIsOpenModal(false)}
        />
        <MainBtn
          className="w-full"
          text="Sil"
          onClick={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </Modal>
  );
};
