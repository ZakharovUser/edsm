import { useMemo } from 'react';
import { TreeSelect, TreeSelectProps } from 'antd';
import { useUserGroups } from 'entites/contacts/hooks';
import { ContactGroupModel } from 'entites/contacts/models';

export function SelectUserGroups() {
  const { data, isError, isPending } = useUserGroups();

  const treeData = useMemo(() => parseUserGroups(data), [data]);

  return (
    <TreeSelect
      allowClear
      treeCheckable
      loading={isPending}
      treeData={treeData}
      dropdownStyle={{ zIndex: 1500 }}
      showCheckedStrategy="SHOW_PARENT"
      status={(isError && 'error') || ''}
    />
  );
}

type OptionsType = TreeSelectProps['treeData'];

function parseUserGroups(data?: ContactGroupModel[]): OptionsType {
  return data?.reduce((groups: OptionsType, group) => {
    const groupName = `${group.name}-${group.id}`;

    groups?.push({
      key: groupName,
      value: groupName,
      title: group.name,
      children: group.users.map((user, index) => {
        const fullName = `${user.last_name} ${user.first_name.at(0)}. ${user.middle_name.at(0)}.`;
        const value = `${fullName}-${group.id}-${index}`;

        return {
          value,
          key: value,
          title: fullName,
        };
      }),
    });

    return groups;
  }, []);
}
