import { Trash2 } from 'lucide-react';

export default function BannerPreviewCard({
  openBannerDeleteModal,
}: {
  openBannerDeleteModal: (value: boolean) => void;
}) {
  return (
    <div className="border border-[#909090] border-dashed  rounded-[24px] py-4 px-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h4>Banner</h4>
          <button onClick={() => openBannerDeleteModal(true)}>
            <Trash2 size={24} color="#141414" />
          </button>
        </div>
        <div className="h-[140px] w-full overflow-hidden rounded-[20px]">
          <img
            src="https://landauschool.com/default.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

