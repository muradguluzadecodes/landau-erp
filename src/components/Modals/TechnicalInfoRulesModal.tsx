import { Modal } from 'antd';
import { MainBtn } from '../MainBtn';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  OrderedList,
  Palette,
  Underline,
  UnorderedList,
  Uppercase,
} from '@/assets/icons/icons';
export default function TechnicalInfoRulesModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}) {
  return (
    <Modal
      open={isOpenModal}
      title="Qaydalar"
      onCancel={() => setIsOpenModal(false)}
      footer={[]}
      width={800}
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[14px] font-regular text-[#555555]">Aşağı xanaya qaydaları (Azərbaycanca) əlavə edin.</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <Bold />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <Underline />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <Italic />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <Uppercase />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <Palette />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <UnorderedList />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <OrderedList />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <AlignLeft />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <AlignCenter />
            </button>
            <button className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300 ">
              <AlignRight />
            </button>
          </div>
        </div>
        <div>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="w-full rounded-[24px] border border-[#E7E7E7] bg-[#FCFCFC] p-4 resize-none"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <MainBtn
            variant="outline"
            text="Geri"
            className="w-full"
            onClick={() => setIsOpenModal(false)}
          />
          <MainBtn
            className="w-full"
            text="Yadda saxla"
            // onClick={handleSubmit}
            // isLoading={isPending}
          />
        </div>
      </div>
    </Modal>
  );
}
