import { Tooltip } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Settings } from '@/assets/icons/icons';
import FloatInput from '@/components/FloatInput';
import { MainBtn } from '@/components/MainBtn';
import { CreateUserModal } from '@/components/Modals/CreateUserModal';

export const Filters = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center mb-6 w-full">
      <p className="text-[24px] font-bold">İstifadəçilər</p>
      <CreateUserModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />

      <div className="flex gap-2">
        <FloatInput
          label="Ad soyad"
          placeholder="Ad soyad"
          containerClassName="w-[180px]!"
          type="text"
          // value={values.email}
          value={''}
          // onChange={(e) => handleChangeValue(e, 'email')}
        />
        <FloatInput
          label="Email"
          placeholder="Email"
          containerClassName="w-[180px]!"
          type="text"
          // value={values.email}
          value={''}
          // onChange={(e) => handleChangeValue(e, 'email')}
        />

        <MainBtn className="w-24 h-12" text="İxrac et" variant="outline" />
        <MainBtn className="w-22 h-12" text="Axtar" variant="outline" />

        <MainBtn
          text={<Settings />}
          className="w-12! h-12 px-0!"
          variant="outline"
        />
        <Tooltip placement="left" title="Yeni istifadəçi yarat">
          <MainBtn
            text={<Plus color="white" size={22} />}
            className="w-12! h-12 px-0!"
            onClick={() => setIsOpenModal(true)}
            disabled={false}
          />
        </Tooltip>
      </div>
    </div>
  );
};
