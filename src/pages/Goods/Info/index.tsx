import { useRef, useState } from 'react'
import { supplierItemList } from '@/services/goods/supplier';
import { history } from '@umijs/max';
import DrawerModal from '@/components/DrawerModal';
import { Button, XTable } from '@xlion/component';
import GoodsDetail from '@/pages/Goods/Info/Detail'


import { SearchColumns, TableColumns } from './columns'

const Goods = () => {
  const drawerModal = useRef<any>();
  const [goodsItem, setGoodsItem] = useState<any>({});
  const goodsDetailRef = useRef<any>();
  const actionRef = useRef(null)

  const onShow = (recode) => {
    setGoodsItem(recode)
    drawerModal.current?.show();
  }

  return (
    <>
      <XTable
        rowKey={'itemId'}
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          span: 4,
          columns: SearchColumns()
        }}
        toolbar={{
          title: (
            <Button type="primary" onClick={() => {
              history.push('/goods/create');
            }}>
              创建供应商款式信息
            </Button>
          ),
        }}
        columns={TableColumns({ onShow })}
        request={async (params) => {
          const { entry } = await supplierItemList(params)
          return {
            data: entry.list || [],
            success: true,
            total: entry.totalRecord,
          };
        }}
        scroll={{ x: 'max-content' }}
      />

      <DrawerModal ref={drawerModal} width={1200}>
        <GoodsDetail id={goodsItem?.itemId} ref={goodsDetailRef} />
      </DrawerModal>
    </>
  );
}

export default Goods;
