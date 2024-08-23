import { useMemo } from 'react';
import { TreeSelect, Typography, TreeSelectProps } from 'antd';

import { useUserGroups } from 'entites/contacts/hooks';
import { ContactGroupModel } from 'entites/contacts/models';

// -----------------------------------------------------------------------------------------------------------------

const { Text } = Typography;

export function SelectUserGroups(props: TreeSelectProps) {
  const { data, error, isError, isPending } = useUserGroups();

  const treeData = useMemo(() => parseUserGroups(data), [data]);

  return (
    <>
      <TreeSelect
        {...props}
        allowClear
        treeCheckable
        loading={isPending}
        treeData={treeData}
        treeNodeFilterProp="title"
        disabled={isError || isPending}
        dropdownStyle={{ zIndex: 1500 }}
        showCheckedStrategy="SHOW_PARENT"
        status={(isError && 'error') || ''}
      />
      {isError && <Text type="danger">{error?.detail}</Text>}
    </>
  );
}

// -----------------------------------------------------------------------------------------------------------------

type OptionsType = TreeSelectProps['treeData'];

function parseUserGroups(data?: ContactGroupModel[]): OptionsType {
  return data?.reduce((groups: OptionsType, group) => {
    groups?.push({
      title: group.name,
      key: `${group.id}::${group.name}`,
      value: `${group.id}::${group.name}`,
      children: group.users.map((user) => ({
        key: `${user.email}::${user.id}::${group.id}`,
        value: `${user.email}::${user.id}::${group.id}`,
        title: `${user.last_name} ${user.first_name.at(0)}. ${user.middle_name.at(0)}.`,
      })),
    });

    return groups;
  }, []);
}
