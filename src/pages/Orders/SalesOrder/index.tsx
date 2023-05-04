import { SALES_ORDER_TABLIST } from '@/constants/orders';

import TabPane from '@/components/TabPane';
import { useRef, useState } from 'react';
import List from './List';

function SalesOrder() {
  const [tableTab, setTableTab] = useState<string>('0');
  const actionRef = useRef() as any;

  const handleTabChange = (key: string) => {
    setTableTab(key);
    actionRef?.current?.reset();
  };

  return (
    <div>
      <TabPane
        tabList={SALES_ORDER_TABLIST}
        defaultActiveKey={tableTab}
        onChange={handleTabChange}
      />

      <List tableTab={tableTab} actionRef={actionRef} />
    </div>
  );
}

export default SalesOrder;
