import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Space,
  Popconfirm,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  fetchEmployeesList,
  deleteEmployee,
} from '~/containers/MainApp/Employee/actions';
import { CTable } from '~/lab';
import employeesColumns from '~/containers/MainApp/Employee/columns';
import EmployeeModal from '~/containers/MainApp/Employee/EmployeeModal';

const perPage = 10;

function EmployeesList({
  data,
  showNewEmployeeButton = true,
  withSearch = true,
  withPagination = true,
}) {
  const { t } = useTranslation(['Employee', 'Global']);
  const dispatch = useDispatch();
  const {
    isFetching,
    list,
    total,
    isDeleting,
  } = useSelector(state => state.employee);

  const { data: user } = useSelector(state => state.user.userInfo);

  const [employeesList, setEmployeesList] = useState(list || []);
  const [showEmployeeEditionModal, setShowEmployeeEditionModal] = useState(false);
  const [recordInDeletion, setRecordInDeletion] = useState();
  const [employeeToUpdate, setEmployeeToUpdate] = useState();

  const [listParams, setListParams] = useState({
    page: 1,
    perPage,
    search: '',
  });

  const fetchEmployees = useCallback(() => {
    dispatch(fetchEmployeesList(listParams));
  }, [dispatch, listParams]);

  const onUpdateEmployee = (record) => {
    const formData = { ...record };
    setEmployeeToUpdate(formData);
    setShowEmployeeEditionModal(true);
  };

  const onNewEmployee = () => {
    setEmployeeToUpdate();
    setShowEmployeeEditionModal(true);
  };

  const onCloseEmployeeModal = () => {
    setEmployeeToUpdate();
    setShowEmployeeEditionModal(false);
  };

  const onSearch = (term) => {
    setListParams({
      ...listParams,
      page: 1,
      search: term,
    });
  };

  const onEmployeeModalActionDone = () => {
    // Update case
    if (employeeToUpdate) {
      setEmployeeToUpdate();
      fetchEmployees();
    } else {
      setListParams({
        ...listParams,
        page: 1,
      });
    }
  };

  const actionsColumn = useMemo(() => {
    const onDelete = (id) => {
      setRecordInDeletion(id);
      dispatch(
        deleteEmployee(
          id,
          () => {
            fetchEmployees();
            setRecordInDeletion();
          },
          () => setRecordInDeletion(),
        ),
      );
    };

    return [
      {
        width: '120px',
        render: (record) => {
          const { id } = record;
          return (
            <Space>
              <Tooltip title={t('Global:edit')}>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onUpdateEmployee(record)}
                />
              </Tooltip>
              { user?.id !== id && (
                <Popconfirm
                  title={t('Global:are_you_sure')}
                  onConfirm={() => onDelete(id)}
                  okText={t('Global:yes')}
                  cancelText={t('Global:no')}
                >
                  <Tooltip title={t('Global:delete')}>
                    <Button
                      type="primary"
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                      loading={id === recordInDeletion ? isDeleting : false}
                    />
                  </Tooltip>
                </Popconfirm>
              )}
            </Space>
          );
        },
      },
    ];
  }, [dispatch, fetchEmployees, isDeleting, recordInDeletion, t]);

  const employeesListColumns = useMemo(() => (
    employeesColumns(t).filter(item => item.dataIndex !== 'password').concat(actionsColumn)
  ), [t, actionsColumn]);

  useEffect(() => {
    fetchEmployees();
  }, [listParams]);

  useEffect(() => {
    setEmployeesList(list);
  }, [list]);

  return (
    <>
      <CTable
        columns={employeesListColumns}
        dataSource={data || employeesList}
        loading={isFetching}
        withSearch={withSearch}
        onSearch={onSearch}
        extraButton={(
          showNewEmployeeButton && (
            <Button
              type="primary"
              onClick={onNewEmployee}
            >
              { t('Employee:cta_new') }
            </Button>
          )
        )}
        pagination={
          withPagination && ({
            pageSize: perPage,
            onChange: (page) => {
              setListParams({
                ...listParams,
                page,
              });
            },
            total,
          })
        }
      />
      <EmployeeModal
        visible={showEmployeeEditionModal}
        onClose={onCloseEmployeeModal}
        record={employeeToUpdate}
        onDone={onEmployeeModalActionDone}
      />
    </>
  );
}

export default EmployeesList;
