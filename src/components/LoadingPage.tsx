import { Spin } from 'antd';

export const LoadingPage = () => {
  return (
    <div className="w-full h-[60%] flex-center">
      <Spin size="large" />
    </div>
  );
};
