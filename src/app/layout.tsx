import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Montserrat } from 'next/font/google';

import { Sidebar } from '../components/Sidebar';
import Hydration from '../queries/hydration';
import { UserAndLogout } from '@/components/UserAndLogout';
import { ToastProvider } from '@/providers/toastProvider';
import Store from '@/queries/store';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Store>
          <Hydration>
            <AntdRegistry>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: 'Montserrat, sans-serif',
                  },
                }}
              >
                <ToastProvider />
                <div className=" p-6 flex gap-6">
                  <Sidebar />

                  <div className="w-full">
                    <UserAndLogout />
                    {children}
                  </div>
                </div>
              </ConfigProvider>
            </AntdRegistry>
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
