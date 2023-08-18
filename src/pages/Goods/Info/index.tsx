import { useRef, useState } from 'react'
import { supplierItemList } from '@/services/goods/supplier';
import { history } from '@umijs/max';
import DrawerModal from '@/components/DrawerModal';
import { Button, XTable } from '@xlion/component';
import GoodsDetail from '@/pages/Goods/Info/Detail'

import useColumns from './useColumns'
import { ActionType } from '@xlion/component/dist/x-table/interface';

const Goods = () => {
  const drawerModal = useRef<any>();
  const [goodsItem, setGoodsItem] = useState<any>({});
  const goodsDetailRef = useRef<any>();
  const actionRef = useRef<ActionType>()
  const [searchColumns, tableColumns] = useColumns({ drawerModal, setGoodsItem })


  return (
    <>
      <XTable
        rowKey={'itemId'}
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          span: 4,
          columns: searchColumns
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
        columns={tableColumns}
        request={async (params) => {
          const { entry }: any = await supplierItemList(params)
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
