import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar, message } from 'antd'
import './index.less';
import { history } from 'umi';
import { logout, changePasswd } from '@/services/login'
import { useLocation } from '@umijs/max'
import RestPassword from './resetPassword';
import avatar from '@/assets/img/avatar.png'

import styles from './index.less'

export default function () {
  const [visible, setVisible] = useState<boolean>(false);
  const location = useLocation();
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const [menuList, setMenuList] = useState<any[]>([
    {
      label: '系统管理',
      key: 'system',
      onClick: () => {
        history.replace('/system/user');
      },
    },
    {
      label: '修改密码',
      key: 'rePassWord',
      onClick: () => setVisible(true),
    },
    {
      label: '退出登录',
      key: 'logout',
      onClick: async () => {
        try {
          await logout();
          localStorage.removeItem('token')
          history.replace('/login');
        } catch (error) {
        }
      },
    },
  ])

  // 重置密码
  const handleSubmitRestPasswd = async (val) => {
    try {
      const parmas = {
        passwd: val.passwd
      }
      const res = await changePasswd(parmas);
      message.success('密码更新成功')
      setVisible(false);
    } catch (error) {
      console.log(error, 'error')
    }
  }


  useEffect(() => {
    if (window.location.hash.search(/system/) > -1) {
      setMenuList([
        {
          label: '首页',
          key: 'nationalOverview',
          onClick: () => {
            history.push('/nationalOverview');
          },
        },
        {
          label: '退出登录',
          key: 'logout',
          onClick: async () => {
            try {
              await logout();
              localStorage.removeItem('token')
              history.replace('/login');
            } catch (error) {
            }
          },
        }])
    }

  }, [location])

  return (
    <div className={'avatar-name'}>
      <Dropdown
        trigger={['click']}
        menu={{
          items: menuList
        }}
        placement="bottom"
      >
        <div>
          <span style={{
            color: '#fff',
            marginRight: '10px'
          }}>
            {userInfo?.uname ?? ''}
          </span>
          <Avatar
            style={{
              background: '#fff'
            }}
            size={'default'}
            src={avatar}
            className={styles.user_img}
          />

        </div>
      </Dropdown>

      <RestPassword open={visible} onCancel={() => setVisible(false)} onOk={handleSubmitRestPasswd} />
    </div>
  );
}
