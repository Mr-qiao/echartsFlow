/**
 * 侧边栏类目处理
 */

import React, { useState, useMemo } from 'react';
import { Input, Tree } from 'antd';
import type { TreeDataNode } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ChartPanel from '@/components/ChartPanel'
import type { DataNode } from 'antd/es/tree';
const { Search } = Input;

import styles from '../index.less';


// mock 数据
const defaultData: TreeDataNode[] = [
  {
    title: '北京大兴',
    key: '0',
    children: [
      {
        title: '摄像头1',
        key: '0-1',
      },
      {
        title: '摄像头2',
        key: '0-2',
      },
      {
        title: '摄像头3',
        key: '0-3',
      }
    ]
  }
];

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: TreeDataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

// 筛选父元素
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
}


const SilderSearch = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);


  // 重构数据结构
  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] => data.map((item) => {
      const strTitle = item.title as string;
      const index = strTitle.indexOf(searchValue);
      const beforeStr = strTitle.substring(0, index);
      const afterStr = strTitle.slice(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value" style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });
    return loop(defaultData);

  }, [searchValue]);



  // 展开/收起节点时触发
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  console.log(autoExpandParent, '======-----======')


  // 搜索下拉框
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  }

  return (
    <ChartPanel title='监控列表' style={{ minHeight: '80vh', overFlow: 'hiddle' }}>
      <Search
        className={styles.search_inp}
        placeholder="请输入设备名称"
        allowClear
        enterButton="搜索"
        size="large"
        onChange={handleSearch}
      />

      <Tree
        defaultExpandAll={true}
        onExpand={onExpand}
        expandedKeys={expandedKeys} // （受控）展开指定的树节点
        autoExpandParent={autoExpandParent} // 是否自动展开父节点
        treeData={treeData}
        multiple={true}
      />

    </ChartPanel>
  )
}


export default SilderSearch;