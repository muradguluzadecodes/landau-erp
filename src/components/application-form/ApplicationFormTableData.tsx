"use client";
import { useState } from 'react';
import TableDataHeader from './TableDataHeader';
import TableDataMain from './TableDataMain';
import TableDataFooter from './TableDataFooter';
import TableDataCopyLink from './TableDataCopyLink';

export default function ApplicationFormTableData() {
  const [copyLink, setCopyLink] = useState<boolean>(false);
  return (
    <div className="bg-[#f7f7f7] rounded-[16px] overflow-hidden">
      <TableDataHeader copyLink={copyLink} setCopyLink={setCopyLink} />
      {copyLink ? (
        <TableDataCopyLink setCopyLink={setCopyLink} />
      ) : (
        <TableDataMain />
      )}
      <TableDataFooter />
    </div>
  );
}
