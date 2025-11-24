'use client';

import { useMutation } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { sendEmail } from '@/api/user-management/sendEmail';
import { updateUserInfo } from '@/api/user-management/updateUserInfo';
import FloatInput from '@/components/FloatInput';
import { LoadingPage } from '@/components/LoadingPage';
import { MainBtn } from '@/components/MainBtn';
import { ChangeContactModal } from '@/components/Modals/ChangeContactModal';
import { ChangeMainDataModal } from '@/components/Modals/ChangeMainDataModal';
import { ChangePasswordModal } from '@/components/Modals/ChangePasswordModal';
import { DeleteUserModal } from '@/components/Modals/DeleteUserModal';
import { LanguageEnum } from '@/lib/enums';
import { formatDate } from '@/lib/helpers';
import { LanguageKey, UpdateUser } from '@/lib/types';
import { useUserById } from '@/queries/user/useUserById';

const initialValues: UpdateUser = {
  email: '',
  first_name: '',
  last_name: '',
  father_name: '',
  username: '',
  mobile_number: '',
  educational_institution: '',
  position: '',
  department: '',
  language: '',
  custom_permission_id: '',
};

export default function Page() {
  const params = useParams();
  const userId = params.userId;

  const { data: user, isLoading } = useUserById(userId as string);

  const [userData, setUserData] = useState<UpdateUser>(initialValues);
  const [initialUserData, setInitialUserData] =
    useState<UpdateUser>(initialValues);

  useEffect(() => {
    if (user) {
      const formatted: UpdateUser = {
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        father_name: user.father_name || '',
        username: user.username || '',
        mobile_number: user.mobile_number || '',
        educational_institution: user.educational_institution || '',
        position: user.position || '',
        department: user.department || '',
        language: user.language || '',
        custom_permission_id: user.custom_permission_id || '',
      };

      setUserData(formatted);
      setInitialUserData(formatted);
    }
  }, [user]);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);
  const [isOpenChangeContactModal, setIsOpenChangeContactModal] =
    useState(false);
  const [isOpenMainDataModal, setIsOpenMainDataModal] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserInfo,
  });

  const { mutate: mutateSendEmail, isPending: isPendingSendEmail } =
    useMutation({
      mutationFn: sendEmail,
    });

  const isDisabled =
    JSON.stringify(userData) === JSON.stringify(initialUserData);

  const handleSubmit = () => {
    if (isDisabled) return;

    const updatedUserData = {
      ...userData,
      position: null,
      custom_permission_id: null,
    };

    mutate(
      { id: userId as string, data: updatedUserData },
      {
        onSuccess: () => {
          setInitialUserData(userData);
        },
      },
    );
  };

  const handleSendEmail = () => {
    mutateSendEmail(userId as string);
  };

  if (isLoading) return <LoadingPage />;

  if (!user && !isLoading) notFound();

  return (
    <>
      <DeleteUserModal
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
        userId={userId}
      />

      <ChangePasswordModal
        isOpenModal={isOpenChangePasswordModal}
        setIsOpenModal={setIsOpenChangePasswordModal}
        userId={userId}
      />

      <ChangeContactModal
        isOpenModal={isOpenChangeContactModal}
        setIsOpenModal={setIsOpenChangeContactModal}
        email={userData?.email || ''}
        phone={userData?.mobile_number || ''}
        setUserData={setUserData}
      />

      <ChangeMainDataModal
        isOpenModal={isOpenMainDataModal}
        setIsOpenModal={setIsOpenMainDataModal}
        userData={userData}
        setUserData={setUserData}
      />

      <section className="section">
        <h2 className="text-[20px] font-semibold mb-6">Profil məlumatları</h2>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[24px] font-semibold mb-2">
              {user.full_name} {user.father_name} Oğlu
            </h1>
            <p className="text-[14px] text-light">
              Son giriş vaxtı:{' '}
              <span className="font-semibold text-black">
                {formatDate(user.last_login_time as string)}
              </span>
            </p>
          </div>

          <div className="flex gap-4">
            <MainBtn variant="outline" text="Admin et" />
            <MainBtn
              variant="outline"
              text="Sil"
              color="red"
              className="w-[100px]!"
              onClick={() => setIsOpenDeleteModal(true)}
            />
            <MainBtn variant="outline" text="Deaktiv et" color="gray" />
            <MainBtn
              variant="outline"
              text="Email gonder"
              className="w-[180px]!"
              color="green"
              onClick={handleSendEmail}
              isLoading={isPendingSendEmail}
            />
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="subSection mt-10">
          <div className="flex justify-between">
            <p className="font-semibold">Əlaqə məlumatları</p>
            <button onClick={() => setIsOpenChangeContactModal(true)}>
              <Pencil size={20} />
            </button>
          </div>

          <div className="flex justify-between gap-6 mt-4">
            <FloatInput
              type="text"
              value={userData?.mobile_number || ''}
              label="Telefon nomresi"
              disabled
            />
            <FloatInput
              type="text"
              value={userData?.email || ''}
              label="Email"
              disabled
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="subSection mt-6">
          <div className="flex justify-between">
            <p className="font-semibold">Şifrənin yenilənməsi</p>
            <button onClick={() => setIsOpenChangePasswordModal(true)}>
              <Pencil size={20} />
            </button>
          </div>
        </div>

        {/* MAIN DATA */}
        <div className="subSection mt-6">
          <div className="flex justify-between">
            <p className="font-semibold">Əsas məlumatlar</p>
            <button onClick={() => setIsOpenMainDataModal(true)}>
              <Pencil size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <FloatInput
              type="text"
              label="İstifadəçi adı"
              value={userData?.username || ''}
              disabled
            />

            <FloatInput
              label="Təhsil müəssisəsi"
              type="text"
              value={userData?.educational_institution as string}
              disabled
            />

            <FloatInput
              label="Vəzifə"
              type="text"
              value={userData?.position || ''}
              disabled
            />

            <FloatInput
              label="Departament"
              type="text"
              value={userData?.department as string}
              disabled
            />

            <FloatInput
              type="text"
              label="ERP icazələr"
              value={userData?.custom_permission_id as string}
              disabled
            />

            <FloatInput
              type="text"
              label="Dil"
              value={LanguageEnum[userData?.language as LanguageKey]}
              disabled
            />
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <MainBtn variant="outline" text="Geri" />
            <MainBtn
              text="Təstiqlə"
              isLoading={isPending}
              disabled={isDisabled}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </section>
    </>
  );
}
